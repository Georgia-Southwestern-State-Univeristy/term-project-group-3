document.addEventListener('DOMContentLoaded', () => {
  const workoutForm = document.getElementById('workout-form');
  const listEl = document.getElementById('workout-list');
  const statusEl = document.getElementById('status');

  const render = () => {
    const workouts = Storage.getWorkouts();
    listEl.innerHTML = workouts.length
      ? `<ul>${workouts.map(w => `
          <li>
            <strong>${w.type}</strong>: ${w.duration} mins 
            <small>(${new Date(w.createdAt).toLocaleDateString()})</small>
          </li>`).join('')}</ul>`
      : '<p>No workouts yet. Add one above!</p>';
  };

  workoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = document.getElementById('workout-type').value.trim();
    const duration = document.getElementById('workout-duration').value;

    if (Storage.saveWorkout({ type, duration })) {
      workoutForm.reset();
      render();
      statusEl.textContent = 'Workout saved successfully!';
    }
  });

  render(); // Essential for demonstrating Local Data Persistence after refresh
});
