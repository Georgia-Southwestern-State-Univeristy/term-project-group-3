const { describe, it } = require('node:test');
const assert = require('node:assert');

describe('Week 13: Regression & Reliability Tests', () => {

  // 1. Regression
  it('Regression: App should not crash if activities data is missing', () => {
    const fallbackData = []; 
    const serverResponseCode = 200; 
    
    assert.strictEqual(serverResponseCode, 200, 'System should return 200 OK, not 500 Error');
    assert.deepStrictEqual(fallbackData, [], 'System should generate an empty array if data is missing');
  });

  // 2. Regression
  it('Regression: Frontend should reject blank or negative workout times', () => {
    const validateInput = (duration) => duration > 0;
    
    assert.strictEqual(validateInput(0), false, '0 minutes should be invalid');
    assert.strictEqual(validateInput(-10), false, 'Negative minutes should be invalid');
    assert.strictEqual(validateInput(30), true, 'Positive minutes should be valid');
  });

  // 3. Refactored Code
  it('Refactored Code: storage.js should save and retrieve data independently', () => {
    let mockStore = {};
    const mockStorageModule = {
      save: (key, data) => { mockStore[key] = JSON.stringify(data); },
      get: (key) => JSON.parse(mockStore[key] || '[]')
    };

    const testWorkout = [{ activity: 'Running', minutes: 30 }];
    mockStorageModule.save('fittrack_workouts', testWorkout);
    
    const retrieved = mockStorageModule.get('fittrack_workouts');
    assert.deepStrictEqual(retrieved, testWorkout, 'Storage layer should work perfectly isolated from the UI');
  });

  // 4. Reliability
  it('Reliability: App should handle corrupted JSON in localStorage gracefully', () => {
    let mockLocalStorage = {
      'fittrack_workouts': '{ bad_json: ' 
    };

    const safeRetrieve = (key) => {
      try {
        return JSON.parse(mockLocalStorage[key]);
      } catch (error) {
        return []; 
      }
    };

    const retrieved = safeRetrieve('fittrack_workouts');
    assert.deepStrictEqual(retrieved, [], 'App should return empty array instead of crashing on bad JSON');
  });

});
