const STORAGE_KEY = 'fittrack_workouts';

class Storage {
  // Read
  static getWorkouts() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) {
        console.warn('Corrupted workout data found. Resetting...');
        localStorage.removeItem(STORAGE_KEY);
        return [];
      }
      return parsed;
    } catch (e) {
      console.warn('Failed to read workout data:', e.message);
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
  }

  // Save
  static saveWorkouts(workouts) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
      return true;
    } catch (e) {
      console.warn('Failed to save workout data:', e.message);
      displayStatus
        ? displayStatus(
            'Could not save your workout. Storage may be full or blocked.',
            true
          )
        : alert('Could not save your workout. Storage may be full or blocked.');
      return false;
    }
  }

  // Add
  static saveWorkout(workout) {
    const workouts = Storage.getWorkouts();

    // ID and timestamp
    if (!workout.id) {
      workout.id = Date.now();
    }
    if (!workout.createdAt) {
      workout.createdAt = new Date().toISOString();
    }

    workouts.push(workout);
    return Storage.saveWorkouts(workouts);
  }

  // Delete
  static deleteWorkout(id) {
    let workouts = Storage.getWorkouts();
    workouts = workouts.filter((w) => w.id !== id);
    return Storage.saveWorkouts(workouts);
  }

  // Update
  static updateWorkout(id, updates) {
    let workouts = Storage.getWorkouts();
    const index = workouts.findIndex((w) => w.id === id);
    if (index === -1) {
      console.warn(`Workout ID ${id} not found for update.`);
      return false;
    }
    workouts[index] = { ...workouts[index], ...updates };
    return Storage.saveWorkouts(workouts);
  }
}
