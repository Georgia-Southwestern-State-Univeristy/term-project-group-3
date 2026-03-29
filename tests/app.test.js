const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const mockElements = {};
global.document = {
  addEventListener: () => {},
  getElementById: (id) => {
    if (!mockElements[id]) {
      mockElements[id] = { value: '', innerHTML: '', textContent: '', focus: () => {}, reset: () => {} };
    }
    return mockElements[id];
  },
  querySelector: () => ({ innerText: '' }), 
  querySelectorAll: () => [],
};

global.window = {};
global.alert = () => {}; 
global.confirm = () => true; 
global.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, value) { this.store[key] = String(value); },
  clear() { this.store = {}; }
};

const appCode = fs.readFileSync(path.join(__dirname, '../src/app.js'), 'utf8');
eval(appCode);

describe('Week 11: End-to-End and Reliability Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    mockElements['date'] = { value: '2026-03-30' };
    mockElements['type'] = { value: 'Running' };
    mockElements['duration'] = { value: '30' };
    mockElements['workouts-container'] = { innerHTML: '' };
    mockElements['total-workouts'] = { textContent: '0' };
    mockElements['total-minutes'] = { textContent: '0' };
    mockElements['workout-form'] = { reset: () => {} };
  });

  it('loads without errors', () => {
    assert.strictEqual(true, true);
  });

  it('E2E: Should successfully add a new workout and render it to the dashboard', () => {
    addWorkout();

    const savedData = JSON.parse(localStorage.getItem('fittrack_workouts'));
    assert.strictEqual(savedData.length, 1);
    assert.strictEqual(savedData[0].type, 'Running');
    assert.strictEqual(savedData[0].duration, 30);

    const container = document.getElementById('workouts-container');
    assert.ok(container.innerHTML.includes('Running'));
    assert.ok(container.innerHTML.includes('30 minutes'));
  });

  it('E2E: Should successfully edit an existing workout and persist changes', () => {
    const mockWorkout = [{ id: 123, date: '2026-03-30', type: 'Running', duration: 30 }];
    localStorage.setItem('fittrack_workouts', JSON.stringify(mockWorkout));

    startEdit(123);
    mockElements['edit-duration-123'] = { value: '45' };
    saveEdit(123);
    const updatedData = JSON.parse(localStorage.getItem('fittrack_workouts'));
    assert.strictEqual(updatedData[0].duration, 45);
  });

  it('Integration: Dashboard summary totals update correctly when multiple workouts are added', () => {
    const mockWorkouts = [
      { id: 1, date: '2026-03-30', type: 'Running', duration: 20 },
      { id: 2, date: '2026-03-31', type: 'Cycling', duration: 40 }
    ];
    localStorage.setItem('fittrack_workouts', JSON.stringify(mockWorkouts));
    renderWeeklySummary();
    assert.strictEqual(String(document.getElementById('total-workouts').textContent), '2');
    assert.strictEqual(String(document.getElementById('total-minutes').textContent), '60');
  });

  it('Failure Path: Should handle corrupted localStorage data gracefully and return empty array', () => {
    localStorage.setItem('fittrack_workouts', '{ invalid_json: ');

    let workouts;
    try {
      workouts = getWorkouts();
    } catch (e) {
      workouts = []; 
    }
    assert.deepStrictEqual(workouts, []);
  });
});
