const Storage = require('../src/js/storage');

describe('Storage module', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('saveWorkout', () => {
    it('saves workout data and returns true', () => {
      const result = Storage.saveWorkout({ type: 'run', duration: 30 });
      expect(result).toBe(true);
    });

    it('stores JSON in localStorage', () => {
      Storage.saveWorkout({ type: 'run' });
      const stored = localStorage.getItem('workouts');
      expect(JSON.parse(stored)).toEqual([{ type: 'run' }]);
    });
  });

  describe('getWorkouts', () => {
    it('returns empty array when nothing stored', () => {
      const workouts = Storage.getWorkouts();
      expect(workouts).toEqual([]);
    });

    it('returns parsed workouts from localStorage', () => {
      localStorage.setItem('workouts', JSON.stringify([{ id: 1 }]));
      const workouts = Storage.getWorkouts();
      expect(workouts).toEqual([{ id: 1 }]);
    });
  });
});
