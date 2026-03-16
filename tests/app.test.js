global.alert = function () {};
global.confirm = function () {
  return true;
};
global.window = { alert: global.alert, confirm: global.confirm };

const dateInput = { value: '', valueAsDate: null };
const typeInput = { value: '' };
const durationInput = { value: '' };
const formInput = { addEventListener: () => {} };
const container = { innerHTML: '' };
const stats = { textContent: '' };

global.document = {
  addEventListener: () => {},
  getElementById: id => {
    switch (id) {
      case 'workout-form':
        return formInput;
      case 'date':
        return dateInput;
      case 'type':
        return typeInput;
      case 'duration':
        return durationInput;
      case 'workouts-container':
        return container;
      case 'total-workouts':
      case 'total-minutes':
      case 'avg-duration':
      case 'favorite-type':
        return stats;
      default:
        return null;
    }
  },
  querySelector: () => null,
  querySelectorAll: () => [],
};

global.console = { ...global.console, error: () => {} };

const localStorageMock = (() => {
  let store = {};
  const MAX_SIZE = 5000;
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      const serialized = JSON.stringify(store);
      const addition = encodeURIComponent(key).length + encodeURIComponent(value).length;
      if (serialized.length + addition > MAX_SIZE) {
        const err = new Error(
          "Failed to execute 'setItem' on 'Storage': Setting the value of 'xxx' exceeded the quota."
        );
        err.name = 'QuotaExceededError';
        throw err;
      }
      store[key] = String(value);
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
  };
})();
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

require('../src/app');

const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert').strict;

describe('FitTrack App Regression Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    console.error = () => {};
  });

  it('should reject malformed data on load and return empty array', () => {
    localStorage.setItem('fittrack_workouts', '{ "workouts": [ ');
    const result = getWorkouts();
    assert.deepEqual(result, []);
  });

  it('should handle localStorage quota exceeded error gracefully', () => {
    localStorage.setItem('large-data', 'x'.repeat(4900));
    try {
      saveWorkouts([{ id: 1, date: '2026-03-16', type: 'Run', duration: 30 }]);
      assert.fail('Expected QuotaExceededError to be thrown');
    } catch (e) {
      assert.strictEqual(e.name, 'QuotaExceededError');
    }
  });

  it('should not allow more than 3 workouts per day', () => {
    const dateEl = document.getElementById('date');
    const typeEl = document.getElementById('type');
    const durationEl = document.getElementById('duration');

    dateEl.value = '2026-03-16';
    typeEl.value = 'Running';
    durationEl.value = 30;

    addWorkout();
    addWorkout();
    addWorkout();

    let workouts = getWorkouts().filter(w => w.date === '2026-03-16');
    assert.strictEqual(workouts.length, 3);

    durationEl.value = 25;
    addWorkout();

    const finalWorkouts = getWorkouts().filter(w => w.date === '2026-03-16');
    assert.strictEqual(finalWorkouts.length, 3);
  });
});
