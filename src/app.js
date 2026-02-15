document.addEventListener('DOMContentLoaded', () => {
  const statusEl = document.getElementById('status');
  const form = document.getElementById('workout-form');
  const listEl = document.getElementById('workout-list');
  const inputEl = document.getElementById('workout-name');
  
  const render = () => {
    const workouts = Storage.getWorkouts();
    listEl.innerHTML = workouts.length 
      ? `<ul>${workouts.map(w => `<li><strong>${w.name}</strong> <small>${new Date(w.createdAt).toLocaleString()}</small></li>`).join('')}</ul>`
      : '<p>No workouts yet. Add one above!</p>';
  };
  
  render();
  statusEl.textContent = 'System ready - localStorage connected';
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = inputEl.value.trim();
    if (!name) return;
    
    if (Storage.saveWorkout({ name })) {
      inputEl.value = '';
      render();
      statusEl.textContent = 'Workout saved successfully!';
    } else {
      statusEl.textContent = 'Error saving workout';
    }
  });
});
