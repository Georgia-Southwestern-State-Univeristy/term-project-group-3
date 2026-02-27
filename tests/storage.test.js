const Storage = require('../src/storage');

describe('Storage Module', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should save a workout successfully', () => {
    const result = Storage.saveWorkout({ type: 'Running', duration: 30 });
    expect(result).toBe(true);

    const savedData = JSON.parse(localStorage.getItem(Storage.STORAGE_KEY));
    expect(savedData.length).toBe(1);
    expect(savedData[0].type).toBe('Running');
  });

  test('should retrieve saved workouts', () => {
    const mockData = [{ type: 'Cycling', duration: 45, id: 1, createdAt: '2023-01-01' }];
    localStorage.setItem(Storage.STORAGE_KEY, JSON.stringify(mockData));

    const workouts = Storage.getWorkouts();
    expect(workouts.length).toBe(1);
    expect(workouts[0].type).toBe('Cycling');
  });

  test('should return empty array when no workouts exist', () => {
    const workouts = Storage.getWorkouts();
    expect(Array.isArray(workouts)).toBe(true);
    expect(workouts.length).toBe(0);
  });

  test('should throw SyntaxError if localStorage data is corrupted', () => {
    localStorage.setItem(Storage.STORAGE_KEY, 'invalid-json');
    expect(() => Storage.getWorkouts()).toThrow(SyntaxError);
  });
});
