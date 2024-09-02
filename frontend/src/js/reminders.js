document.addEventListener('DOMContentLoaded', () => {
    const remindersContainer = document.getElementById('reminders');
  
    // Example reminders
    const reminders = ['Reminder 1', 'Reminder 2'];
    const ul = document.createElement('ul');
    reminders.forEach(reminder => {
      const li = document.createElement('li');
      li.textContent = reminder;
      ul.appendChild(li);
    });
  
    remindersContainer.appendChild(ul);
  });
  