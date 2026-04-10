// Support Node.js testing environment
if (typeof require !== 'undefined') {
  var Storage = require('../src/storage');
}

// Safe DOM helper (important for tests)
function getEl(id) {
  if (typeof document === 'undefined') return null;
  return document.getElementById(id);
}

function addWorkout() {
  const dateEl = getEl('date');
  const typeEl = getEl('type');
  const durationEl = getEl('duration');

  const date = dateEl?.value;
  const type = typeEl?.value;
  const duration = parseInt(durationEl?.value, 10);

  if (!date || !type || !duration) return;

  const workout = { date, type, duration };

  console.log(
    `[${new Date().toISOString()}] [ACTION: LOG_WORKOUT] Attempting to save workout.`,
    workout
  );

  Storage.saveWorkout(workout);

  renderAll();
}

function saveEdit(id) {
  const date = getEl(`edit-date-${id}`)?.value;
  const type = getEl(`edit-type-${id}`)?.value;
  const duration = parseInt(getEl(`edit-duration-${id}`)?.value, 10);

  if (!date || !type || !duration) return;

  const workouts = Storage.getWorkouts();
  const index = workouts.findIndex(w => w.id === id);

  if (index !== -1) {
    workouts[index] = { ...workouts[index], date, type, duration };
    Storage.saveAllWorkouts(workouts);
  }

  renderAll();
}

function renderWorkoutList() {
  const workouts = Storage.getWorkouts();

  const container = getEl('workout-list') || getEl('workouts-container');
  if (!container) return;

  if (!workouts.length) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = workouts
    .map(
      w => `<li id="workout-${w.id}">${w.type} - ${w.duration}</li>`
    )
    .join('');
}

function renderWeeklySummary() {
  const workouts = Storage.getWorkouts();

  const totalEl = getEl('total-workouts');
  const minutesEl = getEl('total-minutes');

  if (totalEl) totalEl.textContent = String(workouts.length);

  const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);
  if (minutesEl) minutesEl.textContent = String(totalMinutes);
}

function renderAll() {
  renderWorkoutList();
  renderWeeklySummary();
}

// expose functions for tests
if (typeof module !== 'undefined') {
  module.exports = {
    addWorkout,
    saveEdit,
    renderAll
  };
}