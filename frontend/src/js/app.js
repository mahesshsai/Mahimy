document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.container.page');

    // Navigation functionality
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetPage = document.getElementById(targetId);

            pages.forEach(page => {
                page.classList.remove('active');
                page.style.transform = 'translateX(-100%)';
            });

            targetPage.classList.add('active');
            targetPage.style.transform = 'translateX(0)';
            document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Handle course form submission
    const courseForm = document.getElementById('course-form-element');
    courseForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const courseName = document.getElementById('course-name').value.trim();

        if (courseName) {
            addCourse(courseName);
            courseForm.reset();
            showPage('my-courses');
        }
    });

    // Add course function
    function addCourse(courseName) {
        const courseList = document.getElementById('courses-list');

        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course-bar');
        courseDiv.textContent = courseName;

        // Add delete button for course
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('btn-start');
        deleteBtn.style.backgroundColor = '#e50914';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (confirm(`Are you sure you want to delete the course: ${courseName}?`)) {
                courseDiv.remove();
                removeCourseFromLocalStorage(courseName);
            }
        });

        courseDiv.appendChild(deleteBtn);
        courseDiv.addEventListener('click', function () {
            localStorage.setItem('selectedCourse', courseName);
            window.location.href = 'course.html';
        });

        courseList.appendChild(courseDiv);
        saveCourseToLocalStorage(courseName);
    }

    // Load courses from local storage
    function loadCourses() {
        const courses = JSON.parse(localStorage.getItem('courses') || '[]');
        courses.forEach(course => {
            addCourse(course);
        });
    }

    // Save course to local storage
    function saveCourseToLocalStorage(course) {
        const courses = JSON.parse(localStorage.getItem('courses') || '[]');
        if (!courses.includes(course)) {
            courses.push(course);
            localStorage.setItem('courses', JSON.stringify(courses));
        }
    }

    // Remove course from local storage
    function removeCourseFromLocalStorage(course) {
        let courses = JSON.parse(localStorage.getItem('courses') || '[]');
        courses = courses.filter(c => c !== course);
        localStorage.setItem('courses', JSON.stringify(courses));
    }

    // Load courses on page load
    loadCourses();

    // Show page function
    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
            page.style.transform = 'translateX(-100%)';
        });

        const targetPage = document.getElementById(pageId);
        targetPage.classList.add('active');
        targetPage.style.transform = 'translateX(0)';
        document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
    }
});
