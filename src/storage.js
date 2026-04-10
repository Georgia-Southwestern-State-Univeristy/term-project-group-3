const Storage = {
  STORAGE_KEY: 'fittrack_workouts_v1',

  getWorkouts() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);

      if (!data) {
        return [];
      }

      const workouts = JSON.parse(data);

      if (!Array.isArray(workouts)) {
        console.error(
          `[${new Date().toISOString()}] [ERROR: STORAGE] Invalid workout data format in localStorage.`
        );
        return [];
      }

      return workouts;
    } catch (error) {
      console.error(
        `[${new Date().toISOString()}] [ERROR: STORAGE] Failed to load workouts from localStorage.`,
        error
      );
      return [];
    }
  },

  saveAllWorkouts(workouts) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(workouts));
      return true;
    } catch (error) {
      console.error(
        `[${new Date().toISOString()}] [ERROR: STORAGE] Failed to save workouts to localStorage.`,
        error
      );
      return false;
    }
  },

  saveWorkout(workout) {
    try {
      const workouts = this.getWorkouts();

      workouts.push({
        ...workout,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      });

      return this.saveAllWorkouts(workouts);
    } catch (error) {
      console.error(
        `[${new Date().toISOString()}] [ERROR: STORAGE] Failed to add workout.`,
        error
      );
      return false;
    }
  },

  deleteWorkoutById(id) {
    try {
      const workouts = this.getWorkouts();
      const filtered = workouts.filter((workout) => workout.id !== id);
      return this.saveAllWorkouts(filtered);
    } catch (error) {
      console.error(
        `[${new Date().toISOString()}] [ERROR: STORAGE] Failed to delete workout.`,
        error
      );
      return false;
    }
  },

  updateWorkoutById(id, updatedData) {
    try {
      const workouts = this.getWorkouts();
      const index = workouts.findIndex((workout) => workout.id === id);

      if (index === -1) {
        console.error(
          `[${new Date().toISOString()}] [ERROR: STORAGE] Workout not found for update. ID: ${id}`
        );
        return false;
      }

      workouts[index] = {
        ...workouts[index],
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };

      return this.saveAllWorkouts(workouts);
    } catch (error) {
      console.error(
        `[${new Date().toISOString()}] [ERROR: STORAGE] Failed to update workout.`,
        error
      );
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

    workouts.forEach((workout) => {
      const workoutDate = new Date(workout.date + 'T00:00:00');
      if (workoutDate >= oneWeekAgo) {
        const dateKey = workoutDate.toISOString().split('T')[0];
        if (weeklyData[dateKey]) {
          weeklyData[dateKey].count += 1;
          weeklyData[dateKey].workouts.push(workout.type);
        }
      }
    });

    return weeklyData;
  },
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Storage;
}
