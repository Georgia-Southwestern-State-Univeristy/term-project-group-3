const Storage = {
  STORAGE_KEY: "fittrack_workouts_v1",

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
    return data ? JSON.parse(data) : [];
  },
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = Storage;
}
