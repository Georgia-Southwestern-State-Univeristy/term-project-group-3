const Storage = {
  STORAGE_KEY: 'fittrack_workouts_v1',

  saveWorkout(workout) {
    const workouts = this.getWorkouts();
    workouts.push({
      ...workout,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(workouts));
    return true;
  },

  getWorkouts() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) {
      return [];
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Error parsing workouts from localStorage:', e);
      return [];
    }
  },

  deleteWorkout(index) {
    try {
      const workouts = this.getWorkouts();
      workouts.splice(index, 1);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(workouts));
      return true;
    } catch (e) {
      console.error('Storage delete failed:', e);
      return false;
    }
  },

  updateWorkout(index, updatedData) {
    try {
      const workouts = this.getWorkouts();
      workouts[index] = {
        ...workouts[index],
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(workouts));
      return true;
    } catch (e) {
      console.error('Storage update failed:', e);
      return false;
    }
  },

  getWeeklyData() {
    const workouts = this.getWorkouts();
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const weeklyData = {};

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateKey = d.toISOString().split('T')[0];
      weeklyData[dateKey] = { count: 0, workouts: [] };
    }

    workouts.forEach((w) => {
      const workoutDate = new Date(w.createdAt);
      if (workoutDate >= oneWeekAgo) {
        const dateKey = workoutDate.toISOString().split('T')[0];
        if (weeklyData[dateKey]) {
          weeklyData[dateKey].count++;
          weeklyData[dateKey].workouts.push(w.name);
        }
      }
    });

    return weeklyData;
  },
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Storage;
}