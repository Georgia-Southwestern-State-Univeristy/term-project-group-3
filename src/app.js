document.addEventListener("DOMContentLoaded", () => {
  const workoutForm = document.getElementById("workout-form");
  const listEl = document.getElementById("workout-list");

  const render = () => {
    const workouts = Storage.getWorkouts();
    listEl.innerHTML = workouts.length
      ? `<ul>${workouts.map((w) => `<li>${w.type}: ${w.duration}m</li>`).join("")}</ul>`
      : "<p>No workouts.</p>";
  };

  workoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const type = document.getElementById("workout-type").value;
    const duration = document.getElementById("workout-duration").value;
    if (Storage.saveWorkout({ type, duration })) {
      workoutForm.reset();
      render();
    }
  });

  render();
});
