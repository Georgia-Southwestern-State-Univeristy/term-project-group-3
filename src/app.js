// FitTrack App

const workoutStorage = globalThis.Storage || window.Storage;
document.addEventListener('DOMContentLoaded', function () {
  console.log('FitTrack loaded');

  const dateField = document.getElementById('date');
  if (dateField) {
    dateField.valueAsDate = new Date();
  }

  renderAll();

  const workoutForm = document.getElementById('workout-form');
  if (workoutForm) {
    workoutForm.addEventListener('submit', function (e) {
      e.preventDefault();
      addWorkout();
    });
  }
});

function addWorkout() {
  const dateInput = document.getElementById('date');
  const typeInput = document.getElementById('type');
  const durationInput = document.getElementById('duration');

  const date = dateInput.value;
  const type = typeInput.value.trim();
  const duration = parseInt(durationInput.value, 10);

  // Validation
  if (!date || !type || !durationInput.value) {
    console.error('Missing required fields');
    alert('Please fill all fields.');
    return;
  }

  if (Number.isNaN(duration) || duration <= 0) {
    console.error('Invalid duration');
    alert('Duration must be greater than 0.');
    return;
  }

  const workout = { date, type, duration };

  console.log('Saving workout:', workout);

  const saved = workoutStorage.saveWorkout(workout);

  if (!saved) {
    alert('Failed to save workout.');
    return;
  }

  const lastDate = dateInput.value;
  document.getElementById('workout-form').reset();
  dateInput.value = lastDate;

  renderAll();
}

function deleteWorkout(id) {
  const success = workoutStorage.deleteWorkoutById(id);

  if (!success) {
    alert('Delete failed.');
    return;
  }

  renderAll();
}

function startEdit(id) {
  const workouts = workoutStorage.getWorkouts();
  const workout = workouts.find((w) => w.id === id);

  if (!workout) return;

  const container = document.getElementById(`workout-${id}`);
  if (!container) return;

  container.innerHTML = `
    <input type="date" id="edit-date-${id}" value="${workout.date}">
    <input type="text" id="edit-type-${id}" value="${workout.type}">
    <input type="number" id="edit-duration-${id}" value="${workout.duration}">
    <button onclick="saveEdit(${id})">Save</button>
  `;
}

function saveEdit(id) {
  const date = document.getElementById(`edit-date-${id}`).value;
  const type = document.getElementById(`edit-type-${id}`).value.trim();
  const duration = parseInt(
    document.getElementById(`edit-duration-${id}`).value,
    10
  );

  if (!date || !type || Number.isNaN(duration) || duration <= 0) {
    alert('Invalid input');
    return;
  }

  const updated = workoutStorage.updateWorkoutById(id, {
    date,
    type,
    duration,
  });

  if (!updated) {
    alert('Update failed.');
    return;
  }

  renderAll();
}

function renderAll() {
  renderWorkoutList();
  renderWeeklySummary();
}

function renderWorkoutList() {
  const workouts = workoutStorage.getWorkouts();
  const container = document.getElementById('workouts-container');

  if (!container) return;

  if (!workouts.length) {
    container.innerHTML = '<p>No workouts logged yet.</p>';
    return;
  }

  container.innerHTML = workouts
    .map(
      (w) => `
        <div id="workout-${w.id}">
          <strong>${w.type}</strong> - ${w.duration} min
          <button onclick="startEdit(${w.id})">Edit</button>
          <button onclick="deleteWorkout(${w.id})">Delete</button>
        </div>
      `
    )
    .join('');
}

function renderWeeklySummary() {
  const workouts = workoutStorage.getWorkouts();

  const totalWorkoutsEl = document.getElementById('total-workouts');
  const totalMinutesEl = document.getElementById('total-minutes');

  if (totalWorkoutsEl) {
    totalWorkoutsEl.textContent = workouts.length;
  }

  const totalMinutes = workouts.reduce((sum, w) => sum + (w.duration || 0), 0);

  if (totalMinutesEl) {
    totalMinutesEl.textContent = totalMinutes;
  }
}
