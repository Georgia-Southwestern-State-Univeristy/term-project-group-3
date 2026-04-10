// FitTrack - Complete App with localStorage
// Features: Add, Edit, Delete, Weekly Summary
// Includes: Week 13 Observability & Support Improvements

document.addEventListener('DOMContentLoaded', function () {
  console.log('FitTrack loaded');

  console.log(
    `[${new Date().toISOString()}] [ACTION: LOAD_HISTORY] App initialized and workout history requested.`
  );

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

  if (typeof render === 'function') {
    render();
  }
});

// CRUD OPERATIONS
function addWorkout() {
  const dateInput = document.getElementById('date');
  const typeInput = document.getElementById('type');
  const durationInput = document.getElementById('duration');

  const date = dateInput.value;
  const type = typeInput.value.trim();
  const duration = parseInt(durationInput.value, 10);

  if (!date || !type || !durationInput.value) {
    console.error(
      `[${new Date().toISOString()}] [ERROR: VALIDATION] Failed to save: Missing required fields.`
    );
    alert('Please fill all fields.');
    return;
  }

  if (Number.isNaN(duration) || duration <= 0) {
    console.error(
      `[${new Date().toISOString()}] [ERROR: VALIDATION] Failed to save: Invalid duration. User input: ${durationInput.value}`
    );
    alert('Duration must be a positive number greater than 0.');
    return;
  }

  const workout = {
    date,
    type,
    duration,
  };

  console.log(
    `[${new Date().toISOString()}] [ACTION: LOG_WORKOUT] Attempting to save workout.`,
    workout
  );

  const saved = Storage.saveWorkout(workout);

  if (!saved) {
    alert('Unable to save workout data right now.');
    return;
  }

  const lastUsedDate = dateInput.value;
  document.getElementById('workout-form').reset();
  dateInput.value = lastUsedDate;

  typeInput.value = '';
  durationInput.value = '';

  renderAll();
}

function deleteWorkout(id) {
  if (!confirm('Are you sure you want to delete this workout?')) {
    return;
  }

  const deleted = Storage.deleteWorkoutById(id);

  if (!deleted) {
    alert('Unable to delete workout right now.');
    return;
  }

  console.log(
    `[${new Date().toISOString()}] [ACTION: DELETE_WORKOUT] User deleted workout ID: ${id}`
  );

  renderAll();
}

function startEdit(id) {
  const workouts = Storage.getWorkouts();
  const workout = workouts.find(w => w.id === id);

  if (!workout) {
    console.error(
      `[${new Date().toISOString()}] [ERROR: EDIT] Workout not found for edit. ID: ${id}`
    );
    return;
  }

  const container = document.getElementById(`workout-${id}`);

  if (!container) {
    console.error(
      `[${new Date().toISOString()}] [ERROR: UI] Workout container not found for edit. ID: ${id}`
    );
    return;
  }

  container.innerHTML = `
    <div class="edit-form">
      <div class="form-row">
        <input type="date" id="edit-date-${id}" value="${workout.date}">
        <select id="edit-type-${id}">
          <option value="Running" ${workout.type === 'Running' ? 'selected' : ''}>Running</option>
          <option value="Cycling" ${workout.type === 'Cycling' ? 'selected' : ''}>Cycling</option>
          <option value="Swimming" ${workout.type === 'Swimming' ? 'selected' : ''}>Swimming</option>
          <option value="Weights" ${workout.type === 'Weights' ? 'selected' : ''}>Weights</option>
          <option value="Yoga" ${workout.type === 'Yoga' ? 'selected' : ''}>Yoga</option>
          <option value="Walking" ${workout.type === 'Walking' ? 'selected' : ''}>Walking</option>
        </select>
        <input type="number" id="edit-duration-${id}" value="${workout.duration}" min="1">
        <button class="btn btn-success" onclick="saveEdit(${id})">Save</button>
        <button class="btn btn-secondary" onclick="renderAll()">Cancel</button>
      </div>
    </div>
  `;
}

function saveEdit(id) {
  const date = document.getElementById(`edit-date-${id}`).value;
  const type = document.getElementById(`edit-type-${id}`).value.trim();
  const durationInput = document.getElementById(`edit-duration-${id}`).value;
  const duration = parseInt(durationInput, 10);

  if (!date || !type || !durationInput) {
    console.error(
      `[${new Date().toISOString()}] [ERROR: VALIDATION] Failed to edit: Missing required fields.`
    );
    alert('Please fill all fields.');
    return;
  }

  if (Number.isNaN(duration) || duration <= 0) {
    console.error(
      `[${new Date().toISOString()}] [ERROR: VALIDATION] Failed to edit: Invalid duration.`
    );
    alert('Duration must be a positive number greater than 0.');
    return;
  }

  const updated = Storage.updateWorkoutById(id, { date, type, duration });

  if (!updated) {
    alert('Unable to update workout right now.');
    return;
  }

  console.log(`[${new Date().toISOString()}] [ACTION: EDIT_WORKOUT] Workout edited:`, id);

  renderAll();
}

// RENDER FUNCTIONS
function renderAll() {
  renderWorkoutList();
  renderWeeklySummary();
}

function renderWorkoutList() {
  const workouts = Storage.getWorkouts();
  const container = document.getElementById('workouts-container');

  if (!container) {
    console.error(
      `[${new Date().toISOString()}] [ERROR: UI] Workouts container not found.`
    );
    return;
  }

  if (!workouts || workouts.length === 0) {
    container.innerHTML = '<div class="empty-state">No workouts yet. Add one above!</div>';
    return;
  }

  const sorted = [...workouts].sort((a, b) => {
    const dateA = new Date(a.date + 'T00:00:00');
    const dateB = new Date(b.date + 'T00:00:00');
    return dateB - dateA;
  });

  container.innerHTML = sorted
    .map(
      workout => `
        <div class="workout-item" id="workout-${workout.id}">
          <div class="workout-info">
            <strong>${workout.type}</strong><br>
            <small>${formatDate(workout.date)} • ${workout.duration} minutes</small>
          </div>
          <div class="workout-actions">
            <button class="btn btn-primary" onclick="startEdit(${workout.id})" style="padding: 8px 16px;">Edit</button>
            <button class="btn btn-danger" onclick="deleteWorkout(${workout.id})" style="padding: 8px 16px;">Delete</button>
          </div>
        </div>
      `
    )
    .join('');
}

function renderWeeklySummary() {
  const allWorkouts = Storage.getWorkouts();

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const weeklyWorkouts = allWorkouts.filter(workout => {
    const workoutDate = new Date(workout.date + 'T00:00:00');
    return workoutDate >= sevenDaysAgo && workoutDate <= today;
  });

  const totalWorkoutsEl = document.getElementById('total-workouts');
  const totalMinutesEl = document.getElementById('total-minutes');
  const avgDurationEl = document.getElementById('avg-duration');
  const favoriteTypeEl = document.getElementById('favorite-type');

  if (!totalWorkoutsEl || !totalMinutesEl || !avgDurationEl || !favoriteTypeEl) {
    console.error(
      `[${new Date().toISOString()}] [ERROR: UI] Weekly summary elements not found.`
    );
    return;
  }

  totalWorkoutsEl.textContent = weeklyWorkouts.length;

  const totalMinutes = weeklyWorkouts.reduce((sum, workout) => sum + (workout.duration || 0), 0);
  totalMinutesEl.textContent = totalMinutes;

  const avg = weeklyWorkouts.length > 0 ? Math.round(totalMinutes / weeklyWorkouts.length) : 0;
  avgDurationEl.textContent = avg;

  const typeMinutes = {};
  weeklyWorkouts.forEach(workout => {
    typeMinutes[workout.type] = (typeMinutes[workout.type] || 0) + (workout.duration || 0);
  });

  const sortedTypes = Object.entries(typeMinutes).sort((a, b) => b[1] - a[1]);
  const favorite = sortedTypes[0];

  favoriteTypeEl.textContent = favorite ? favorite[0] : '-';
}

// UTILITIES
function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// SEED DATA (for demo purposes)
function seedDemoData() {
  const existing = Storage.getWorkouts();

  if (existing.length === 0) {
    const demoData = [
      {
        id: Date.now() - 1000,
        date: '2026-03-01',
        type: 'Running',
        duration: 30,
        createdAt: new Date().toISOString(),
      },
      {
        id: Date.now() - 2000,
        date: '2026-02-28',
        type: 'Cycling',
        duration: 45,
        createdAt: new Date().toISOString(),
      },
      {
        id: Date.now() - 3000,
        date: '2026-02-27',
        type: 'Yoga',
        duration: 20,
        createdAt: new Date().toISOString(),
      },
    ];

    const saved = Storage.saveAllWorkouts(demoData);

    if (saved) {
      renderAll();
      console.log('Demo data loaded');
    }
  }
}