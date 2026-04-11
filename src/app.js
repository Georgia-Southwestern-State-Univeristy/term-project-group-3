
// FitTrack - Complete App with localStorage
// Features: Add, Edit, Delete, Weekly Summary
// Includes: Beta Phase Observability & Logging
document.addEventListener('DOMContentLoaded', function () {
  console.log('FitTrack loaded');

  // ACTION LOG: App Initialization & History Load
  console.log(
    `[${new Date().toISOString()}] [ACTION: LOAD_HISTORY] Successfully loaded workouts from localStorage.`
  );

  // Set today's date as default
  document.getElementById('date').valueAsDate = new Date();

  // Load and display workouts
  renderAll();

  // Handle form submission (Add)
  document
    .getElementById('workout-form')
    .addEventListener('submit', function (e) {
      e.preventDefault();
      addWorkout();
    });

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
  const type = typeInput.value;
  const duration = parseInt(durationInput.value);

  // ERROR HANDLING: Failure Case 1 - Empty Fields
  if (!date || !type || !duration) {
    console.error(
      `[${new Date().toISOString()}] [ERROR: VALIDATION] Failed to save: Missing required fields.`
    );
    alert('Please fill all fields');
    return;
  }

  // ERROR HANDLING: Failure Case 2 - Invalid Duration
  if (duration <= 0) {
    console.error(
      `[${new Date().toISOString()}] [ERROR: VALIDATION] Failed to save: Invalid duration. User input: ${durationInput.value}`
    );
    alert('Duration must be a positive number greater than 0.');
    return;
  }

  const workout = {
    id: Date.now(),
    date: date,
    type: type,
    duration: duration,
    created: new Date().toISOString(),
  };

  // ACTION LOG: Save Workout
  console.log(
    `[${new Date().toISOString()}] [ACTION: LOG_WORKOUT] Attempting to save:`,
    workout
  );

  let workouts = getWorkouts();
  workouts.push(workout);

  saveWorkouts(workouts);

  const lastUsedDate = dateInput.value;
  document.getElementById('workout-form').reset();
  dateInput.value = lastUsedDate;

  typeInput.value = '';
  durationInput.value = '';

  renderAll();
}

function deleteWorkout(id) {
  if (!confirm('Are you sure you want to delete this workout?')) return;

  let workouts = getWorkouts();
  workouts = workouts.filter((w) => w.id !== id);
  saveWorkouts(workouts);

  renderAll();

  // ACTION LOG: Delete Workout
  console.log(
    `[${new Date().toISOString()}] [ACTION: DELETE_WORKOUT] User deleted workout ID: ${id}`
  );
}

function startEdit(id) {
  const workouts = getWorkouts();
  const workout = workouts.find((w) => w.id === id);
  if (!workout) return;

  const container = document.getElementById(`workout-${id}`);
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
  const type = document.getElementById(`edit-type-${id}`).value;
  const duration = parseInt(
    document.getElementById(`edit-duration-${id}`).value
  );

  if (!date || !type || !duration) {
    alert('Please fill all fields');
    return;
  }

  let workouts = getWorkouts();
  const index = workouts.findIndex((w) => w.id === id);

  if (index !== -1) {
    workouts[index] = { ...workouts[index], date, type, duration };
    saveWorkouts(workouts);
    renderAll();
    console.log(
      `[${new Date().toISOString()}] [ACTION: EDIT_WORKOUT] Workout edited:`,
      id
    );
  }
}

// LOCALSTORAGE HELPERS
function getWorkouts() {
  const data = localStorage.getItem('fittrack_workouts');
  return data ? JSON.parse(data) : [];
}

function saveWorkouts(workouts) {
  localStorage.setItem('fittrack_workouts', JSON.stringify(workouts));
}

// RENDER FUNCTIONS
function renderAll() {
  renderWorkoutList();
  renderWeeklySummary();
}

function renderWorkoutList() {
  const workouts = getWorkouts();
  const container = document.getElementById('workouts-container');

  if (workouts.length === 0) {
    container.innerHTML =
      '<div class="empty-state">No workouts yet. Add one above!</div>';
    return;
  }

  // Sort by date (newest first) - parse as local date to avoid timezone issues
  const sorted = workouts.sort((a, b) => {
    const dateA = new Date(a.date + 'T00:00:00');
    const dateB = new Date(b.date + 'T00:00:00');
    return dateB - dateA;
  });

  container.innerHTML = sorted
    .map(
      (w) => `
        <div class="workout-item" id="workout-${w.id}">
            <div class="workout-info">
                <strong>${w.type}</strong><br>
                <small>${formatDate(w.date)} • ${w.duration} minutes</small>
            </div>
            <div class="workout-actions">
                <button class="btn btn-primary" onclick="startEdit(${w.id})" style="padding: 8px 16px;">Edit</button>
                <button class="btn btn-danger" onclick="deleteWorkout(${w.id})" style="padding: 8px 16px;">Delete</button>
            </div>
        </div>
    `
    )
    .join('');
}

function renderWeeklySummary() {
  const allWorkouts = getWorkouts();

  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const weeklyWorkouts = allWorkouts.filter((w) => {
    const workoutDate = new Date(w.date + 'T00:00:00');
    return workoutDate >= sevenDaysAgo && workoutDate <= today;
  });

  document.getElementById('total-workouts').textContent = weeklyWorkouts.length;

  const totalMinutes = weeklyWorkouts.reduce(
    (sum, w) => sum + (w.duration || 0),
    0
  );
  document.getElementById('total-minutes').textContent = totalMinutes;

  const avg =
    weeklyWorkouts.length > 0
      ? Math.round(totalMinutes / weeklyWorkouts.length)
      : 0;
  document.getElementById('avg-duration').textContent = avg;

  const typeMinutes = {};
  weeklyWorkouts.forEach((w) => {
    typeMinutes[w.type] = (typeMinutes[w.type] || 0) + (w.duration || 0);
  });

  const sortedTypes = Object.entries(typeMinutes).sort((a, b) => b[1] - a[1]);
  const favorite = sortedTypes[0];

  document.getElementById('favorite-type').textContent = favorite
    ? favorite[0]
    : '-';
}

// UTILITIES
function formatDate(dateString) {
  // Parse as local time by appending T00:00:00 to avoid timezone shift
  const date = new Date(dateString + 'T00:00:00');
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// SEED DATA (for demo purposes)
function seedDemoData() {
  const existing = getWorkouts();
  if (existing.length === 0) {
    const demoData = [
      {
        id: Date.now() - 1000,
        date: '2026-03-01',
        type: 'Running',
        duration: 30,
        created: new Date().toISOString(),
      },
      {
        id: Date.now() - 2000,
        date: '2026-02-28',
        type: 'Cycling',
        duration: 45,
        created: new Date().toISOString(),
      },
      {
        id: Date.now() - 3000,
        date: '2026-02-27',
        type: 'Yoga',
        duration: 20,
        created: new Date().toISOString(),
      },
    ];
    saveWorkouts(demoData);
    renderAll();
    console.log('Demo data loaded');
  }
}
