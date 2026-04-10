// FitTrack - Stable Version (No test hacks)

document.addEventListener('DOMContentLoaded', function () {
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
  const date = document.getElementById('date')?.value;
  const type = document.getElementById('type')?.value;
  const duration = parseInt(document.getElementById('duration')?.value, 10);

  if (!date || !type || !duration) {
    alert('Please fill all fields correctly.');
    return;
  }

  const workout = { date, type, duration };

  Storage.saveWorkout(workout);

  document.getElementById('workout-form')?.reset();

  renderAll();
}

function deleteWorkout(id) {
  Storage.deleteWorkoutById(id);
  renderAll();
}

function startEdit(id) {
  const workouts = Storage.getWorkouts();
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
  const date = document.getElementById(`edit-date-${id}`)?.value;
  const type = document.getElementById(`edit-type-${id}`)?.value;
  const duration = parseInt(
    document.getElementById(`edit-duration-${id}`)?.value,
    10
  );

  if (!date || !type || !duration) return;

  Storage.updateWorkoutById(id, { date, type, duration });

  renderAll();
}

function renderAll() {
  renderWorkoutList();
  renderWeeklySummary();
}

function renderWorkoutList() {
  const workouts = Storage.getWorkouts();
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
  const workouts = Storage.getWorkouts();

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
