const assert = require('node:assert');
const { test, describe, beforeEach } = require('node:test');
const Storage = require('../src/storage.js');

// Mock localStorage
global.localStorage = {
  _data: {},
  getItem(key) {
    return this._data[key] || null;
  },
  setItem(key, value) {
    this._data[key] = value;
  },
  removeItem(key) {
    delete this._data[key];
  },
};

beforeEach(() => {
  global.localStorage._data = {};
});

describe('Storage Module - Thin Vertical Slice', () => {
  test('saveWorkout stores data', () => {
    const result = Storage.saveWorkout({ name: 'Morning Run' });
    assert.strictEqual(result, true);

    const workouts = Storage.getWorkouts();
    assert.strictEqual(workouts.length, 1);
    assert.strictEqual(workouts[0].name, 'Morning Run');
    assert.ok(workouts[0].id);
    assert.ok(workouts[0].createdAt);
  });

  test('getWorkouts returns empty array initially', () => {
    const workouts = Storage.getWorkouts();
    assert.deepStrictEqual(workouts, []);
  });

  test('multiple saves persist correctly', () => {
    Storage.saveWorkout({ name: 'Workout 1' });
    Storage.saveWorkout({ name: 'Workout 2' });

    const workouts = Storage.getWorkouts();
    assert.strictEqual(workouts.length, 2);
  });

  test('returns false on localStorage error', () => {
    global.localStorage.setItem = () => {
      throw new Error('QuotaExceeded');
    };
    const result = Storage.saveWorkout({ name: 'Test' });
    assert.strictEqual(result, false);
  });
});
