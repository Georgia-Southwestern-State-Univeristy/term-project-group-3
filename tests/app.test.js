const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

global.mockElements = {};
global.document = {
  addEventListener: () => {},
  getElementById: (id) => {
    if (!global.mockElements[id]) {
      global.mockElements[id] = {
        addEventListener: () => {},
        value: '',
        innerHTML: '',
        textContent: '',
        focus: () => {},
        reset: () => {},
        style: { display: '' },
        className: '',
      };
    }
    return global.mockElements[id];
  },
  querySelector: () => ({ innerText: '' }),
  querySelectorAll: () => [],
};

global.window = {};

global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = String(value);
  },
  removeItem(key) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  },
};

global.alert = () => {};
global.confirm = () => true;

global.Storage = require('../src/storage.js');

// Load app.js using new Function so ALL declarations (const + function)
// share the same scope and can reference each other
const appCode = fs.readFileSync(path.join(__dirname, '../src/app.js'), 'utf8');
const createApp = new Function(
  appCode +
    `;\n
  return {
    addWorkout,
    deleteWorkout,
    startEdit,
    saveEdit,
    renderAll,
    renderWorkoutList,
    renderWeeklySummary
  };`
);
const app = createApp();

describe('App module', () => {
  it('loads without errors', () => {
    assert.strictEqual(true, true);
  });
});

describe('Week 11: End-to-End and Reliability Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    global.mockElements = {};
    const today = new Date().toISOString().split('T')[0];
    global.mockElements['date'] = { value: today };
    global.mockElements['type'] = { value: 'Running' };
    global.mockElements['duration'] = { value: '30' };
    global.mockElements['workouts-container'] = { innerHTML: '' };
    global.mockElements['total-workouts'] = { textContent: '0' };
    global.mockElements['total-minutes'] = { textContent: '0' };
    global.mockElements['workout-form'] = { reset: () => {} };
  });

  it('E2E: Should successfully add a new workout and render it to the dashboard', () => {
    app.addWorkout();

    const savedData = JSON.parse(localStorage.getItem('fittrack_workouts'));
    assert.strictEqual(savedData.length, 1);
    assert.strictEqual(savedData[0].type, 'Running');
    assert.strictEqual(savedData[0].duration, 30);
  });

  it('E2E: Should successfully edit an existing workout and persist changes', () => {
    const today = new Date().toISOString().split('T')[0];
    const mockWorkout = [
      { id: 123, date: today, type: 'Running', duration: 30 },
    ];
    localStorage.setItem('fittrack_workouts', JSON.stringify(mockWorkout));

    app.startEdit(123);

    global.mockElements['edit-date-123'] = { value: today };
    global.mockElements['edit-type-123'] = { value: 'Running' };
    global.mockElements['edit-duration-123'] = { value: '45' };

    app.saveEdit(123);

    const updatedData = JSON.parse(localStorage.getItem('fittrack_workouts'));
    assert.strictEqual(updatedData[0].duration, 45);
  });

  it('Integration: Dashboard summary totals update correctly when multiple workouts are added', () => {
    const today = new Date().toISOString().split('T')[0];

    const mockWorkouts = [
      { id: 1, date: today, type: 'Running', duration: 20 },
      { id: 2, date: today, type: 'Cycling', duration: 40 },
    ];
    localStorage.setItem('fittrack_workouts', JSON.stringify(mockWorkouts));

    app.renderWeeklySummary();

    assert.strictEqual(
      String(global.mockElements['total-workouts'].textContent),
      '2'
    );
    assert.strictEqual(
      String(global.mockElements['total-minutes'].textContent),
      '60'
    );
  });

  it('Failure Path: Should handle corrupted localStorage data gracefully and return empty array', () => {
    localStorage.setItem('fittrack_workouts', '{ invalid_json: ');

    let workouts = Storage.getWorkouts();

    assert.deepStrictEqual(workouts, []);
  });

  // Rejects negative duration inputs
  it('Edge Case: Should block adding a workout with zero or negative duration', () => {
    global.mockElements['duration'] = { value: '-5' }; 
    let alertCalled = false;
    global.alert = () => { alertCalled = true; };

    addWorkout();

    const savedData = Storage.getWorkouts();
    assert.strictEqual(savedData.length, 0); 
    assert.strictEqual(alertCalled, true);
  });

  // Rejects submission if required fields are missing
  it('Edge Case: Should block adding a workout if required fields are blank', () => {
    global.mockElements['type'] = { value: '' }; 
    let alertCalled = false;
    global.alert = () => { alertCalled = true; };

    addWorkout();

    const savedData = Storage.getWorkouts();
    assert.strictEqual(savedData.length, 0);
    assert.strictEqual(alertCalled, true);
  });

  // Verifies successful deletion of data
  it('State: Should successfully delete an existing workout by ID', () => {
    const mockWorkout = [{ id: 456, date: '2026-03-30', type: 'Running', duration: 30 }];
    localStorage.setItem('fittrack_workouts_v1', JSON.stringify(mockWorkout));

    deleteWorkout(456);

    const savedData = Storage.getWorkouts();
    assert.strictEqual(savedData.length, 0); 
  });

  // Prevents crashes when deleting a non-existent item
  it('Reliability: Should handle deleting a non-existent workout gracefully without crashing', () => {
    const mockWorkout = [{ id: 789, date: '2026-03-30', type: 'Yoga', duration: 45 }];
    localStorage.setItem('fittrack_workouts_v1', JSON.stringify(mockWorkout));

    deleteWorkout(999); 

    const savedData = Storage.getWorkouts();
    assert.strictEqual(savedData.length, 1);
    assert.strictEqual(savedData[0].id, 789); 
  });

  // Ensures new items receive a unique ID
  it('Data Integrity: Should auto-generate a unique ID when saving a new workout', () => {
    addWorkout();

    const savedData = Storage.getWorkouts();
    assert.strictEqual(savedData.length, 1);
    assert.ok(savedData[0].id); 
    assert.strictEqual(typeof savedData[0].id, 'number'); 
  });

  // Verifies the empty state message displays correctly
  it('UI Reliability: Should display empty state message when no workouts exist', () => {
    renderWorkoutList();
    
    const containerHtml = global.mockElements['workouts-container'].innerHTML;
    assert.ok(containerHtml.includes('No workouts yet'));
  });

  // Aborts edit flow if the targeted ID is invalid
  it('Reliability: Should safely abort editing if workout ID does not exist', () => {
    const mockWorkout = [{ id: 111, date: '2026-03-30', type: 'Cycling', duration: 60 }];
    localStorage.setItem('fittrack_workouts_v1', JSON.stringify(mockWorkout));
    
    global.mockElements['workout-999'] = { innerHTML: 'original content' };
    
    startEdit(999); 
    
    assert.strictEqual(global.mockElements['workout-999'].innerHTML, 'original content');
  });

  // Prevents NaN errors when calculating averages on empty data
  it('Edge Case: Dashboard weekly summary should calculate average as 0 when empty to avoid NaN', () => {
    renderWeeklySummary(); 
    assert.strictEqual(String(global.mockElements['avg-duration'].textContent), '0');
  });
});
