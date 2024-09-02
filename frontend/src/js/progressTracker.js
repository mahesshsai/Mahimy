document.addEventListener("DOMContentLoaded", () => {
  const progressSection = document.getElementById('progress-section');
  const progressBarsElem = document.getElementById('progress-bars');

  function loadProgress() {
      const courses = JSON.parse(localStorage.getItem('courses') || '[]');
      progressBarsElem.innerHTML = '';
      courses.forEach(course => {
          const progressBar = document.createElement('div');
          progressBar.classList.add('course-bar');
          progressBar.textContent = `${course} - 0%`; // Dummy progress value
          progressBarsElem.appendChild(progressBar);
      });
  }

  loadProgress();
});
