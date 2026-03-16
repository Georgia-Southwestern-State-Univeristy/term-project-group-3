function getWorkouts() {
  try {
    const data = localStorage.getItem('fittrack_workouts');
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveWorkouts(workouts) {
  localStorage.setItem('fittrack_workouts', JSON.stringify(workouts));
}

function addWorkout() {
  const dateInput = document.getElementById('date');
  const typeInput = document.getElementById('type');
  const durationInput = document.getElementById('duration');

  const date = dateInput.value;
  const type = typeInput.value;
  const duration = parseInt(durationInput.value);

  if (!date || !type || isNaN(duration)) return;

  const workouts = getWorkouts();
  const todayWorkouts = workouts.filter(w => w.date === date);

  if (todayWorkouts.length >= 3) {
    alert('You cannot log more than 3 workouts per day.');
    return;
  }

  const newWorkout = {
    id: Date.now(),
    date,
    type,
    duration,
  };

  workouts.push(newWorkout);
  try {
    saveWorkouts(workouts);
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.message.includes('quota')) {
      alert('Failed to save: Not enough storage space.');
    } else {
      throw e;
    }
  }
}

// Make functions globally available for Node.js testing
if (typeof global !== 'undefined') {
  global.getWorkouts = getWorkouts;
  global.saveWorkouts = saveWorkouts;
  global.addWorkout = addWorkout;
}
