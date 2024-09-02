document.addEventListener('DOMContentLoaded', () => {
    const courseForm = document.getElementById('course-form-element');
    const courseNameInput = document.getElementById('course-name');
    const courseList = document.getElementById('courses-list');

    function updateCoursePage() {
        const selectedCourse = localStorage.getItem('selectedCourse');
        if (selectedCourse) {
            document.title = `Course - ${selectedCourse}`;
            // Additional code to fetch and display course details
        }
    }

    function handleFileUpload() {
        const fileInput = document.getElementById('file-upload');
        fileInput.addEventListener('change', () => {
            const files = fileInput.files;
            const courseName = localStorage.getItem('selectedCourse');
            if (courseName) {
                const courseFiles = JSON.parse(localStorage.getItem(`files-${courseName}`) || '[]');
                Array.from(files).forEach(file => {
                    courseFiles.push(file.name);
                });
                localStorage.setItem(`files-${courseName}`, JSON.stringify(courseFiles));
                displayUploadedFiles();
            }
        });
    }

    function displayUploadedFiles() {
        const selectedCourse = localStorage.getItem('selectedCourse');
        if (selectedCourse) {
            const courseFiles = JSON.parse(localStorage.getItem(`files-${selectedCourse}`) || '[]');
            const filesList = document.getElementById('uploaded-files-list');
            filesList.innerHTML = '';
            courseFiles.forEach((file, index) => {
                const fileDiv = document.createElement('div');
                fileDiv.classList.add('file-bar');
                fileDiv.innerHTML = `
                    <span>${index + 1}. ${file}</span>
                    <button class="btn-start delete-file" data-file="${file}">Delete</button>
                `;
                filesList.appendChild(fileDiv);
            });
            // Add event listeners to delete buttons
            document.querySelectorAll('.delete-file').forEach(button => {
                button.addEventListener('click', function () {
                    const fileName = this.getAttribute('data-file');
                    deleteFile(fileName);
                });
            });
        }
    }

    function deleteFile(fileName) {
        const selectedCourse = localStorage.getItem('selectedCourse');
        if (selectedCourse) {
            let courseFiles = JSON.parse(localStorage.getItem(`files-${selectedCourse}`) || '[]');
            courseFiles = courseFiles.filter(file => file !== fileName);
            localStorage.setItem(`files-${selectedCourse}`, JSON.stringify(courseFiles));
            displayUploadedFiles();
        }
    }

    // Initialize the course page and file upload functionality
    updateCoursePage();
    handleFileUpload();
});
