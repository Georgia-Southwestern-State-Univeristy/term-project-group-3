const { describe, test, beforeEach } = require('node:test');
const assert = require('node:assert');
const Storage = require('../src/storage');

global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = String(value);
  },
  clear() {
    this.store = {};
  },
};

describe('Storage Module', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should save a workout successfully', () => {
    const result = Storage.saveWorkout({ type: 'Running', duration: 30 });
    assert.strictEqual(result, true);

    const savedData = JSON.parse(localStorage.getItem(Storage.STORAGE_KEY));
    assert.strictEqual(savedData.length, 1);
    assert.strictEqual(savedData[0].type, 'Running');
  });

  test('should retrieve saved workouts', () => {
    const mockData = [{ type: 'Cycling', duration: 45, id: 1, createdAt: '2023-01-01' }];
    localStorage.setItem(Storage.STORAGE_KEY, JSON.stringify(mockData));

    const workouts = Storage.getWorkouts();
    assert.strictEqual(workouts.length, 1);
    assert.strictEqual(workouts[0].type, 'Cycling');
  });

  test('should return empty array when no workouts exist', () => {
    const workouts = Storage.getWorkouts();
    assert.strictEqual(Array.isArray(workouts), true);
    assert.strictEqual(workouts.length, 0);
  });

  test('should return empty array if localStorage data is corrupted', () => {
    localStorage.setItem(Storage.STORAGE_KEY, 'invalid-json');
    const workouts = Storage.getWorkouts();
    assert.strictEqual(Array.isArray(workouts), true);
    assert.strictEqual(workouts.length, 0);
  });
});
