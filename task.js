document.getElementById("task-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-description").value;
    const userId = sessionStorage.getItem('userId'); // Recupera el userId almacenado

    const createTaskUrl = "https://task1manager-7ffc650e7081.herokuapp.com/api/task";

    fetch(createTaskUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: userId, title: title, description: description }),
        credentials: "same-origin"
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const taskItem = document.createElement("li");
        taskItem.textContent = data.title; // Asumiendo que el servidor devuelve el título de la tarea

        const tasksList = document.getElementById("tasks");
        tasksList.appendChild(taskItem);

        document.getElementById("task-title").value = "";
        document.getElementById("task-description").value = "";
    })
    .catch(error => {
        console.error("Error:", error);
    });
});
