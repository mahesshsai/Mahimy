document.addEventListener('DOMContentLoaded', function () {
    const courseTitle = 'Your Course Title'; // This will dynamically be set based on the course
    document.getElementById('course-title').textContent = courseTitle;

    // Event listeners
    document.getElementById('upload-file').addEventListener('click', uploadFile);
    document.getElementById('save-note').addEventListener('click', saveNote);
    document.getElementById('open-suggestions').addEventListener('click', openSuggestions);
    document.getElementById('close-suggestions').addEventListener('click', closeSuggestions);

    // Load existing uploaded files and notes
    loadUploadedFiles();
    loadNotes();

    function uploadFile() {
        const fileInput = document.getElementById('file-input');
        const files = fileInput.files;
        if (files.length > 0) {
            const file = files[0];
            // Save file to localStorage (simplified for this example)
            localStorage.setItem(`file-${file.name}`, file.name);
            // Reload files
            loadUploadedFiles();
        }
    }

    function loadUploadedFiles() {
        const uploadedFilesContainer = document.getElementById('uploaded-files');
        uploadedFilesContainer.innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('file-')) {
                const fileName = localStorage.getItem(key);
                const fileElement = document.createElement('div');
                fileElement.classList.add('uploaded-file');
                fileElement.innerHTML = `
                    <a href="#">${fileName}</a>
                    <button onclick="deleteFile('${key}')">Delete</button>
                `;
                uploadedFilesContainer.appendChild(fileElement);
            }
        }
    }

    function deleteFile(key) {
        localStorage.removeItem(key);
        loadUploadedFiles();
    }

    function saveNote() {
        const noteInput = document.getElementById('note-input');
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            const noteKey = `note-${new Date().getTime()}`;
            localStorage.setItem(noteKey, noteText);
            noteInput.value = '';
            loadNotes();
        }
    }

    function loadNotes() {
        const notesList = document.getElementById('notes-list');
        notesList.innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('note-')) {
                const noteText = localStorage.getItem(key);
                const noteElement = document.createElement('div');
                noteElement.classList.add('uploaded-file');
                noteElement.innerHTML = `
                    <a href="#">${noteText}</a>
                    <button onclick="editNote('${key}')">Edit</button>
                    <button onclick="deleteFile('${key}')">Delete</button>
                `;
                notesList.appendChild(noteElement);
            }
        }
    }

    function editNote() {
        // Functionality to edit an existing note
    }

    function openSuggestions() {
        generateSuggestions(courseTitle);
        document.getElementById('suggestions-popup').style.display = 'block';
    }

    function closeSuggestions() {
        document.getElementById('suggestions-popup').style.display = 'none';
    }

    function generateSuggestions(courseTitle) {
        const suggestionsContainer = document.getElementById('suggestions-container');
        suggestionsContainer.innerHTML = '';

        const suggestions = [
            {
                text: `W3Schools on ${courseTitle}`,
                url: `https://www.w3schools.com/${courseTitle.toLowerCase()}`
            },
            {
                text: `Geeks for Geeks on ${courseTitle}`,
                url: `https://www.geeksforgeeks.org/${courseTitle.toLowerCase()}`
            },
            {
                text: `YouTube videos on ${courseTitle}`,
                url: `https://www.youtube.com/results?search_query=${courseTitle}`
            }
        ];

        suggestions.forEach(suggestion => {
            const suggestionElement = document.createElement('div');
            suggestionElement.classList.add('suggestion-bar');
            suggestionElement.innerHTML = `<a href="${suggestion.url}" target="_blank">${suggestion.text}</a>`;
            suggestionsContainer.appendChild(suggestionElement);
        });
    }
});
