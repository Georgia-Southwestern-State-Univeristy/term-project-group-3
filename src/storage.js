const Storage = {
  STORAGE_KEY: 'fittrack_workouts_v1',

  getWorkouts() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) return [];

      const workouts = JSON.parse(data);
      return Array.isArray(workouts) ? workouts : [];
    } catch (error) {
      console.error('Error reading storage:', error);
      return [];
    }
  },

  saveAllWorkouts(workouts) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(workouts));
      return true;
    } catch (error) {
      console.error('Save failed:', error);
      return false;
    }
  },

  saveWorkout(workout) {
    const workouts = this.getWorkouts();

    workouts.push({
      ...workout,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    });

    return this.saveAllWorkouts(workouts);
  },

  deleteWorkoutById(id) {
    const workouts = this.getWorkouts();
    const filtered = workouts.filter((w) => w.id !== id);
    return this.saveAllWorkouts(filtered);
  },

  updateWorkoutById(id, updatedData) {
    const workouts = this.getWorkouts();
    const index = workouts.findIndex((w) => w.id === id);

    if (index === -1) return false;

    workouts[index] = {
      ...workouts[index],
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };

    return this.saveAllWorkouts(workouts);
  },

  getWeeklyData() {
    const workouts = this.getWorkouts();
    const weeklyData = {};

    workouts.forEach((w) => {
      const dateKey = w.date;
      if (!weeklyData[dateKey]) {
        weeklyData[dateKey] = { count: 0, workouts: [] };
      }
      weeklyData[dateKey].count++;
      weeklyData[dateKey].workouts.push(w.type);
    });

    return weeklyData;
  },
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Storage;
}
