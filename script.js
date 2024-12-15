const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');

// Simulierter Speicher (Firebase oder andere APIs können hier verwendet werden)
const fakeStorage = [];

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const files = fileInput.files;

    for (let file of files) {
        // Simuliere das Hochladen (kann durch echten API-Aufruf ersetzt werden)
        fakeStorage.push(file.name);
    }
    alert('Files uploaded!');
    displayFiles();
});

function displayFiles() {
    fileList.innerHTML = '';
    fakeStorage.forEach(file => {
        const li = document.createElement('li');
        li.textContent = file;
        fileList.appendChild(li);
    });
}
