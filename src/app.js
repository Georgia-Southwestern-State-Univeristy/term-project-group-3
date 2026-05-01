// Utilities
/**
 * Format a date string as a readable local date.
 * e.g., "2026-04-27" → "Mon, Apr 27"
 */
const formatDate = (dateString) => {
  const date = new Date(dateString + 'T00:00:00'); // Force local timezone
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

/**
 * Convert a Date object to "YYYY-MM-DD" string safely.
 */
const toDateString = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

/**
 * Return the rolling 7-day window:
 *   minDate = today − 6 days  (oldest allowed)
 *   maxDate = today            (newest allowed)
 */
const getDateWindow = () => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() - 6);
  minDate.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);

  return { minDate, maxDate };
};

/**
 * Display a status/error message in the #status bar
 * instead of using alert().
 */
const displayStatus = (message, isError = true) => {
  const statusDiv = document.getElementById('status');
  if (!statusDiv) {
    // Fallback to alert if no status element exists
    alert(message);
    return;
  }
  statusDiv.textContent = message;
  statusDiv.style.display = 'block';
  statusDiv.className = isError ? 'alert alert-danger' : 'alert alert-success';
  setTimeout(() => {
    statusDiv.style.display = 'none';
  }, 4000);
};

// Validation Helpers
/**
 * Validate that a workout date falls within the
 * rolling 7-day window (today minus 6 through today).
 */
const isValidWorkoutDate = (dateString) => {
  const { minDate, maxDate } = getDateWindow();
  const workoutDate = new Date(dateString + 'T00:00:00');
  workoutDate.setHours(0, 0, 0, 0);

  if (workoutDate > maxDate) {
    displayStatus('Cannot log workouts for future dates.');
    return false;
  }

  if (workoutDate < minDate) {
    displayStatus(
      'Workouts can only be logged within the last 7 days (' +
        formatDate(toDateString(minDate)) +
        ' through ' +
        formatDate(toDateString(maxDate)) +
        ').'
    );
    return false;
  }

  return true;
};

/**
 * Validate duration: must be 1–1440 minutes.
 */
const isValidDuration = (duration) => {
  if (isNaN(duration) || duration < 1) {
    displayStatus('Workout duration must be at least 1 minute.');
    return false;
  }
  if (duration > 1440) {
    displayStatus('Workout duration cannot exceed 1440 minutes (24 hours).');
    return false;
  }
  return true;
};

/**
 * Check the daily cap: max 6 workouts per day.
 */
const isUnderDailyCap = (dateString) => {
  const existingWorkouts = Storage.getWorkouts();
  const sameDayCount = existingWorkouts.filter(
    (w) => w.date === dateString
  ).length;

  if (sameDayCount >= 6) {
    displayStatus(
      'Maximum 6 workouts per day reached for ' + formatDate(dateString) + '.'
    );
    return false;
  }

  return true;
};

// CRUD Operations
function addWorkout() {
  const dateInput = document.getElementById('date');
  const typeInput = document.getElementById('type');
  const durationInput = document.getElementById('duration');

  const date = dateInput.value;
  const type = typeInput.value;
  const duration = parseInt(durationInput.value, 10);

  // Validate required fields
  if (!date || !type || !duration) {
    console.error(
      `[${new Date().toISOString()}] [ERROR: VALIDATION] Failed to save: Missing required fields.`
    );
    displayStatus('Please fill all fields.');
    return;
  }

  // 7-day window validation
  if (!isValidWorkoutDate(date)) return;

  // Duration validation (1–1440 min)
  if (!isValidDuration(duration)) {
    console.error(
      `[${new Date().toISOString()}] [ERROR: VALIDATION] Failed to save: Invalid duration. User input: ${durationInput.value}`
    );
    return;
  }

  // Daily cap validation (max 6 per day)
  if (!isUnderDailyCap(date)) return;

  const workout = {
    date: date,
    type: type,
    duration: duration,
    // ID and createdAt are handled by storage.js
  };

  // Action Log: Save Workout
  console.log(
    `[${new Date().toISOString()}] [ACTION: LOG_WORKOUT] Attempting to save:`,
    workout
  );

  const saved = Storage.saveWorkout(workout);

  if (saved) {
    // Keep the last-used date, clear type and duration
    const lastUsedDate = dateInput.value;
    document.getElementById('workout-form').reset();
    dateInput.value = lastUsedDate;

    displayStatus('Workout logged successfully!', false);
  }

  renderAll();
}

function deleteWorkout(id) {
  if (!confirm('Are you sure you want to delete this workout?')) return;

  Storage.deleteWorkout(id);

  // ACTION LOG: Delete Workout
  console.log(
    `[${new Date().toISOString()}] [ACTION: DELETE_WORKOUT] User deleted workout ID: ${id}`
  );

  renderAll();
}

// Edit Operations
function startEdit(id) {
  const workouts = Storage.getWorkouts();
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
        <input type="number" id="edit-duration-${id}" value="${workout.duration}" min="1" max="1440">
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
    document.getElementById(`edit-duration-${id}`).value,
    10
  );

  // Validate required fields
  if (!date || !type || !duration) {
    displayStatus('Please fill all fields.');
    return;
  }

  // 7-day window validation
  if (!isValidWorkoutDate(date)) return;

  // Duration validation
  if (!isValidDuration(duration)) return;

  Storage.updateWorkout(id, { date, type, duration });

  console.log(
    `[${new Date().toISOString()}] [ACTION: EDIT_WORKOUT] Workout edited:`,
    id
  );

  displayStatus('Workout updated successfully!', false);
  renderAll();
}

// Render Functions
function renderAll() {
  renderWorkoutList();
  renderWeeklySummary();
}

function renderWorkoutList() {
  const workouts = Storage.getWorkouts();
  const container = document.getElementById('workouts-container');

  if (workouts.length === 0) {
    container.innerHTML =
      '<div class="empty-state">No workouts yet. Add one above!</div>';
    return;
  }

  // Sort by date (newest first)
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
  const allWorkouts = Storage.getWorkouts();

  const { minDate, maxDate } = getDateWindow();

  const weeklyWorkouts = allWorkouts.filter((w) => {
    const workoutDate = new Date(w.date + 'T00:00:00');
    return workoutDate >= minDate && workoutDate <= maxDate;
  });

  // Total workouts
  document.getElementById('total-workouts').textContent = weeklyWorkouts.length;

  // Total minutes
  const totalMinutes = weeklyWorkouts.reduce(
    (sum, w) => sum + (w.duration || 0),
    0
  );
  document.getElementById('total-minutes').textContent = totalMinutes;

  // Average duration
  const avg =
    weeklyWorkouts.length > 0
      ? Math.round(totalMinutes / weeklyWorkouts.length)
      : 0;
  document.getElementById('avg-duration').textContent = avg;

  // Favorite type
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

// Initialization
document.addEventListener('DOMContentLoaded', function () {
  console.log('FitTrack loaded');

  // Auth check
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'login.html';
    return;
  }

  // Action log
  console.log(
    `[${new Date().toISOString()}] [ACTION: LOAD_HISTORY] Successfully loaded workouts from storage.`
  );

  // Set date input constraints
  const dateInput = document.getElementById('date');
  const today = new Date();
  const { minDate } = getDateWindow();

  dateInput.setAttribute('max', toDateString(today));
  dateInput.setAttribute('min', toDateString(minDate));
  dateInput.value = toDateString(today);

  // Render existing data
  renderAll();

  // Handle form submission
  document
    .getElementById('workout-form')
    .addEventListener('submit', function (e) {
      e.preventDefault();
      addWorkout();
    });

  // Handle logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      localStorage.removeItem('isLoggedIn');
      window.location.href = 'login.html';
    });
  }

  // Backend badge (use if applicable)

  const badge = document.getElementById('backendBadge');
  if (badge && window.STORAGE_BACKEND) {
    badge.textContent = 'Storage: ' + window.STORAGE_BACKEND.toUpperCase();
    badge.style.display = 'inline-block';
  }
});
