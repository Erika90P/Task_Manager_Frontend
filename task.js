// document.getElementById("task-form").addEventListener("submit", function(event) {
//     event.preventDefault(); // Prevenir el envío del formulario por defecto

//     const title = document.getElementById("task-title").value;
//     const description = document.getElementById("task-description").value;
//     const userId = sessionStorage.getItem('userId'); // Recupera el userId almacenado

//     const createTaskUrl = "https://task1manager-7ffc650e7081.herokuapp.com/api/task";

//     fetch(createTaskUrl, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ userId: userId, title: title, description: description }),
//         credentials: "same-origin"
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         const taskItem = document.createElement("li");
//         taskItem.textContent = data.title; // Asumiendo que el servidor devuelve el título de la tarea

//         const tasksList = document.getElementById("tasks");
//         tasksList.appendChild(taskItem);

//         document.getElementById("task-title").value = "";
//         document.getElementById("task-description").value = "";
//     })
//     .catch(error => {
//         console.error("Error:", error);
//     });
// });
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

        // Contenedor para el título y la descripción
        const taskInfo = document.createElement("div");

        // Crear y añadir el título de la tarea
        const taskTitle = document.createElement("strong");
        taskTitle.textContent = data.title + ": "; // Asumiendo que el servidor devuelve el título de la tarea
        taskInfo.appendChild(taskTitle);

        // Crear y añadir la descripción de la tarea
        const taskDescription = document.createElement("span");
        taskDescription.textContent = data.description; // Añade la descripción de la tarea
        taskInfo.appendChild(taskDescription);

        // Añadir el contenedor de información al item de la lista
        taskItem.appendChild(taskInfo);

        // Crear el botón de eliminar
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.style.marginLeft = "10px"; // Añadir un poco de margen para separar del texto
        deleteButton.onclick = function() {
            // Aquí puedes añadir una llamada al servidor para eliminar la tarea si es necesario
            taskItem.remove(); // Elimina la tarea de la lista
        };
        taskItem.appendChild(deleteButton);

        const tasksList = document.getElementById("tasks");
        tasksList.appendChild(taskItem);

        document.getElementById("task-title").value = "";
        document.getElementById("task-description").value = "";
    })
    .catch(error => {
        console.error("Error:", error);
    });
});
