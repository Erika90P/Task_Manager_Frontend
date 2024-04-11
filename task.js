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
        const tasksList = document.getElementById("tasks");

        // Crea el elemento de lista
        const taskItem = document.createElement("li");
        taskItem.textContent = `${data.title}: ${data.description}`; // Modificar según la estructura de datos

        // Botón de edición
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function() { editTask(data.id); }; // Suponiendo que `data.id` es el ID de la tarea

        // Botón de eliminación
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() { deleteTask(data.id, taskItem); }; // Pasamos el `taskItem` para poder eliminarlo del DOM

        // Añade los botones al elemento de lista
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        // Añade la tarea a la lista
        tasksList.appendChild(taskItem);

        // Limpia el formulario
        document.getElementById("task-title").value = "";
        document.getElementById("task-description").value = "";
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

function editTask(taskId) {
    // Implementar la lógica para editar una tarea
    // Esto podría implicar mostrar un formulario de edición con los valores actuales de la tarea y enviar los nuevos valores al backend
}

function deleteTask(taskId, taskItem) {
    const deleteTaskUrl = `https://task1manager-7ffc650e7081.herokuapp.com/api/task/${taskId}`;

    fetch(deleteTaskUrl, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            // Elimina la tarea del DOM si la respuesta es exitosa
            taskItem.remove();
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}
