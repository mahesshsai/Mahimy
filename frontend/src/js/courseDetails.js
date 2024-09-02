document.addEventListener('DOMContentLoaded', () => {
    const courseName = localStorage.getItem('selectedCourse');
    if (courseName) {
        document.getElementById('course-title').innerText = courseName;
        generateSuggestions(courseName);
    }

    const fileUpload = document.getElementById('file-upload');
    const uploadedFilesContainer = document.getElementById('uploaded-files');
    const notesTextarea = document.getElementById('notes');
    const saveNotesButton = document.getElementById('save-notes');

    // Load uploaded files from localStorage
    loadUploadedFiles();

    fileUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            const fileData = {
                name: file.name,
                url: fileURL
            };
            addFileToLocalStorage(fileData);
            addFileToUI(fileData);
        }
    });

    saveNotesButton.addEventListener('click', () => {
        const notes = notesTextarea.value;
        if (notes.trim() === '') return;
        
        const notesBlob = new Blob([notes], { type: 'text/doc' });
        const notesURL = URL.createObjectURL(notesBlob);
        const a = document.createElement('a');
        a.href = notesURL;
        a.download = 'notes.doc';
        a.click();
        URL.revokeObjectURL(notesURL);
        notesTextarea.value = '';
    });

    function loadUploadedFiles() {
        const files = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
        files.forEach(fileData => addFileToUI(fileData));
    }

    function addFileToLocalStorage(fileData) {
        const files = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
        files.push(fileData);
        localStorage.setItem('uploadedFiles', JSON.stringify(files));
    }

    function addFileToUI(fileData) {
        const fileItem = document.createElement('div');
        fileItem.classList.add('file-item');
        fileItem.innerHTML = `
            <span><a href="${fileData.url}" target="_blank">${fileData.name}</a></span>
            <button class="delete-file-btn" data-file="${fileData.name}">Delete</button>
        `;
        uploadedFilesContainer.appendChild(fileItem);

        // Add delete functionality
        fileItem.querySelector('.delete-file-btn').addEventListener('click', () => {
            deleteFile(fileData.name);
            fileItem.remove();
        });
    }

    function deleteFile(fileName) {
        let files = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
        files = files.filter(file => file.name !== fileName);
        localStorage.setItem('uploadedFiles', JSON.stringify(files));
    }

    function generateSuggestions(courseName) {
        const suggestionsContainer = document.getElementById('suggestions');
        suggestionsContainer.innerHTML = `
            <p><a href="https://en.wikipedia.org/wiki/${encodeURIComponent(courseName)}" target="_blank">Wikipedia</a></p>
            <p><a href="https://www.youtube.com/results?search_query=${encodeURIComponent(courseName)}" target="_blank">YouTube</a></p>
        `;
    }
});
