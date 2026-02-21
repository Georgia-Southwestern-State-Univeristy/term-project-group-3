const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert');

// Mock localStorage
const localStorageMock = {
  data: {},
  getItem(key) { return this.data[key] || null; },
  setItem(key, value) { this.data[key] = String(value); },
  removeItem(key) { delete this.data[key]; },
  clear() { this.data = {}; }
};
global.localStorage = localStorageMock;

const Storage = require('../src/storage');

describe('Storage module', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saveWorkout returns true on success', () => {
    const result = Storage.saveWorkout({ type: 'run', duration: 30 });
    assert.strictEqual(result, true);
  });

  it('getWorkouts returns empty array initially', () => {
    const workouts = Storage.getWorkouts();
    assert.deepStrictEqual(workouts, []);
  });

  it('getWorkouts returns saved workout', () => {
    const workout = { type: 'swim', duration: 45 };
    Storage.saveWorkout(workout);
    const workouts = Storage.getWorkouts();
    
    assert.strictEqual(workouts.length, 1);
    assert.strictEqual(workouts[0].type, 'swim');
    assert.strictEqual(workouts[0].duration, 45);
  });
});
