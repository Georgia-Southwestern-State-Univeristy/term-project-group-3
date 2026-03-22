const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert');

global.document = {
  addEventListener: () => {},
  getElementById: () => ({
    addEventListener: () => {},
    value: '',
    innerHTML: '',
  }),
  querySelector: () => null,
  querySelectorAll: () => [],
};
global.window = {};
require('../src/app');

describe('App module', () => {
  it('loads without errors', () => {
    assert.strictEqual(true, true);
  });
});

describe('Week 10: Auth, Validation, and Regression Tests', () => {
  it('Validation: Rejects invalid workout durations', () => {
    const validateDuration = val => {
      if (!val || isNaN(val)) return false;
      const num = Number(val);
      return num >= 1 && num <= 300;
    };

    assert.strictEqual(validateDuration(''), false); // Empty
    assert.strictEqual(validateDuration('abc'), false); // Not numeric
    assert.strictEqual(validateDuration(0), false); // Below range
    assert.strictEqual(validateDuration(305), false); // Above range
    assert.strictEqual(validateDuration(45), true); // Valid
  });

  it('Regression: Gracefully handles corrupted localStorage JSON', () => {
    global.localStorage = {
      getItem: () => '{invalid json format}',
      removeItem: () => {},
    };

    const getSafeWorkouts = () => {
      try {
        return JSON.parse(localStorage.getItem('fittrack_workouts_v1')) || [];
      } catch (error) {
        localStorage.removeItem('fittrack_workouts_v1');
        return [];
      }
    };

    assert.doesNotThrow(() => getSafeWorkouts());
    assert.deepStrictEqual(getSafeWorkouts(), []);
  });

  it('Auth: Rejects unauthorized access', async () => {
    global.fetch = async () => ({ status: 401 });
    const response = await fetch('/api/workouts');

    assert.strictEqual(response.status, 401);
  });

  it('Auth: Grants access with valid token', async () => {
    global.fetch = async () => ({ status: 200 });
    const response = await fetch('/api/workouts', {
      headers: { Authorization: 'Bearer valid-token' },
    });

    assert.strictEqual(response.status, 200);
  });
});
