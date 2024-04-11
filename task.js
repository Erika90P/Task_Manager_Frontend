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

        // Crear el texto de la tarea
        const taskContent = document.createTextNode(data.title); // Asumiendo que el servidor devuelve el título de la tarea
        taskItem.appendChild(taskContent);

        // Crear el botón de eliminar
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
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
