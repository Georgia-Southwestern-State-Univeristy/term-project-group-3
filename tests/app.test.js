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
});
