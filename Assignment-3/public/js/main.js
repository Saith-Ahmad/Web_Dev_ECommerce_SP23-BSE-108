function loadProject(filename, title) {
    fetch(`projects/${filename}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('modal-title').innerText = title;
            document.getElementById('modal-description').innerText = data;
            
            document.getElementById('project-modal').style.display = "flex";
        })
        .catch(error => {
            console.error('Error fetching the project file:', error);
        });
}


document.querySelector('.close-btn').onclick = function() {
    document.getElementById('project-modal').style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById('project-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
