/**
 * Storage module - localStorage persistence
 * Thin Vertical Slice: Proves data survives page refresh
 */

const Storage = {
  STORAGE_KEY: "fittrack_workouts_v1",

  saveWorkout(workout) {
    try {
      const workouts = this.getWorkouts();
      workouts.push({
        ...workout,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(workouts));
      return true;
    } catch (e) {
      console.error("Storage save failed:", e);
      return false;
    }
  },

  getWorkouts() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Storage retrieval failed:", e);
      return [];
    }
  },
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = Storage;
}
