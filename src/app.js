document.addEventListener('DOMContentLoaded', () => {
  const statusEl = document.getElementById('status');
  const form = document.getElementById('workout-form');
  const listEl = document.getElementById('workout-list');
  const inputEl = document.getElementById('workout-name');
  const submitBtn = form.querySelector('button[type="submit"]');

  const weeklySummaryDiv = document.getElementById('weekly-summary');
  const summaryTableBody = document.getElementById('summary-table-body');

  let editingIndex = null;

  const listViewBtn = document.createElement('button');
  listViewBtn.id = 'list-view-btn';
  listViewBtn.textContent = 'List View';
  listViewBtn.className = 'active';

  const summaryViewBtn = document.createElement('button');
  summaryViewBtn.id = 'summary-view-btn';
  summaryViewBtn.textContent = 'Weekly Summary';

  const viewToggleDiv = document.createElement('div');
  viewToggleDiv.className = 'view-toggle';
  viewToggleDiv.appendChild(listViewBtn);
  viewToggleDiv.appendChild(summaryViewBtn);
  statusEl.parentNode.insertBefore(viewToggleDiv, form);

  const deleteWorkout = index => {
    if (Storage.deleteWorkout(index)) {
      cancelEdit();
      render();
      statusEl.textContent = 'Workout deleted!';
    } else {
      statusEl.textContent = 'Error deleting workout';
    }
  };

  const startEdit = index => {
    const workouts = Storage.getWorkouts();
    const workout = workouts[index];

    inputEl.value = workout.name;
    editingIndex = index;
    submitBtn.textContent = 'Update Workout';

    if (!document.getElementById('cancel-btn')) {
      const cancelBtn = document.createElement('button');
      cancelBtn.id = 'cancel-btn';
      cancelBtn.type = 'button';
      cancelBtn.textContent = 'Cancel';
      cancelBtn.style.marginLeft = '10px';
      cancelBtn.addEventListener('click', cancelEdit);
      form.appendChild(cancelBtn);
    }

    statusEl.textContent = 'Editing workout...';
    inputEl.focus();
  };

  const cancelEdit = () => {
    editingIndex = null;
    inputEl.value = '';
    submitBtn.textContent = 'Save Workout';

    const cancelBtn = document.getElementById('cancel-btn');
    if (cancelBtn) {
      cancelBtn.remove();
    }

    statusEl.textContent = 'Edit cancelled';
  };

  const renderWeeklySummary = () => {
    const weeklyData = Storage.getWeeklyData();
    const days = Object.keys(weeklyData).sort();

    let totalWorkouts = 0;
    let maxCount = 0;
    let mostActiveDay = '-';

    summaryTableBody.innerHTML = '';

    [...days].reverse().forEach(dateKey => {
      const dayData = weeklyData[dateKey];
      const date = new Date(dateKey);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      totalWorkouts += dayData.count;

      if (dayData.count > maxCount) {
        maxCount = dayData.count;
        mostActiveDay = dayName;
      }

      const row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>${dayName}</strong></td>
        <td>${formattedDate}</td>
        <td>
          <span class="day-bar" style="width: ${Math.max(dayData.count * 30, 20)}px">
            ${dayData.count}
          </span>
        </td>
        <td>${dayData.workouts.join(', ') || '-'}</td>
      `;
      summaryTableBody.appendChild(row);
    });

    document.getElementById('total-count').textContent = totalWorkouts;
    document.getElementById('most-active-day').textContent = mostActiveDay;

    const oldest = new Date(days[0]);
    const newest = new Date(days[days.length - 1]);
    document.getElementById('week-range').textContent =
      `${oldest.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${newest.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  const showListView = () => {
    listEl.style.display = 'block';
    form.style.display = 'block';
    weeklySummaryDiv.style.display = 'none';
    listViewBtn.classList.add('active');
    summaryViewBtn.classList.remove('active');
    statusEl.textContent = 'Showing workout list';
  };

  const showSummaryView = () => {
    renderWeeklySummary();
    listEl.style.display = 'none';
    form.style.display = 'none';
    weeklySummaryDiv.style.display = 'block';
    listViewBtn.classList.remove('active');
    summaryViewBtn.classList.add('active');
    statusEl.textContent = 'Showing weekly summary';
  };

  listViewBtn.addEventListener('click', showListView);
  summaryViewBtn.addEventListener('click', showSummaryView);

  const render = () => {
    const workouts = Storage.getWorkouts();
    listEl.innerHTML = workouts.length
      ? `<ul class="workout-list">${workouts
          .map(
            (w, index) => `
          <li class="workout-item">
            <div class="workout-info">
              <strong>${w.name}</strong> 
              <small>${new Date(w.createdAt).toLocaleString()}
                ${w.updatedAt ? '<em> (edited)</em>' : ''}
              </small>
            </div>
            <div class="button-group">
              <button class="edit-btn" data-index="${index}">Edit</button>
              <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
          </li>`
          )
          .join('')}
      </ul>`
      : '<p>No workouts yet. Add one above!</p>';

    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const index = parseInt(e.target.getAttribute('data-index'));
        startEdit(index);
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const index = parseInt(e.target.getAttribute('data-index'));
        deleteWorkout(index);
      });
    });
  };

  render();
  statusEl.textContent = 'System ready - localStorage connected';

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = inputEl.value.trim();
    if (!name) return;

    if (editingIndex !== null) {
      if (Storage.updateWorkout(editingIndex, { name })) {
        cancelEdit();
        render();
        statusEl.textContent = 'Workout updated successfully!';
      } else {
        statusEl.textContent = 'Error updating workout';
      }
    } else {
      if (Storage.saveWorkout({ name })) {
        inputEl.value = '';
        render();
        statusEl.textContent = 'Workout saved successfully!';
      } else {
        statusEl.textContent = 'Error saving workout';
      }
    }
  });
});
