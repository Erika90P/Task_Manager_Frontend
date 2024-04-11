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
// Manejador del evento submit para añadir una nueva tarea
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
    .then(data => addTaskToList(data)) // Añade la tarea a la lista
    .catch(error => {
        console.error("Error:", error);
    });

    // Limpia el formulario
    document.getElementById("task-title").value = "";
    document.getElementById("task-description").value = "";
});

function addTaskToList(taskData) {
    const tasksList = document.getElementById("tasks");

    // Crea el elemento de lista
    const taskItem = document.createElement("li");
    taskItem.textContent = `${taskData.title}: ${taskData.description}`;

    // Botón de edición
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = function() { editTask(taskData.id, taskItem); };

    // Botón de eliminación
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() { deleteTask(taskData.id, taskItem); };

    // Añade los botones al elemento de lista
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    // Añade la tarea a la lista
    tasksList.appendChild(taskItem);
}

function editTask(taskId, taskItem) {
    // Simula obtener los datos de la tarea para editar
    // Por simplicidad, supongamos que estos datos se obtienen directamente del texto del elemento de lista
    const taskInfo = taskItem.textContent.split(': ');
    const title = taskInfo[0];
    const description = taskInfo[1];

    // Simula un formulario de edición rellenando los valores actuales de la tarea
    document.getElementById("task-title").value = title;
    document.getElementById("task-description").value = description.replace("EditDelete", "").trim(); // Elimina texto de botones

    // Cambia el manejador del formulario para actualizar en lugar de añadir
    const form = document.getElementById("task-form");
    form.onsubmit = function(event) {
        event.preventDefault(); // Previene el envío por defecto
        updateTask(taskId, taskItem);
    };
}

function updateTask(taskId, taskItem) {
    const updateTaskUrl = `https://task1manager-7ffc650e7081.herokuapp.com/api/task/${taskId}`;
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-description").value;

    fetch(updateTaskUrl, {
        method: "PUT", // O "PATCH", dependiendo de tu backend
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: title, description: description }),
        credentials: "same-origin"
    })
    .then(response => response.json())
    .then(data => {
        taskItem.textContent = `${data.title}: ${data.description}`; // Actualiza el texto del elemento de lista
        addTaskToList(data); // Añadir de nuevo botones de acción
    })
    .catch(error => {
        console.error("Error:", error);
    });

    // Restaura el manejador original del formulario
    document.getElementById("task-form").onsubmit = submitNewTask;
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

function submitNewTask(event) {
    // Aquí colocarías el código inicial para añadir una nueva tarea
    // Este sería el código dentro del evento "submit" del formulario
}
