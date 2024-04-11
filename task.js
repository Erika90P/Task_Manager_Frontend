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
// Evento para manejar la creación de nuevas tareas o la actualización de una existente
document.getElementById("task-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    // Verifica si el formulario está en modo de edición
    const isEditing = event.currentTarget.dataset.isEditing === 'true';
    const taskId = event.currentTarget.dataset.taskId;

    if (isEditing) {
        // Modo edición: Actualizar tarea
        updateTask(taskId);
    } else {
        // Modo adición: Agregar nueva tarea
        addNewTask();
    }
});

// Función para agregar una nueva tarea
function addNewTask() {
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
        addTaskToList(data); // Añade la tarea a la lista
        resetForm(); // Restablece el formulario
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

// Añade la tarea al DOM
function addTaskToList(taskData) {
    const tasksList = document.getElementById("tasks");

    // Crea el elemento de lista
    const taskItem = document.createElement("li");
    taskItem.textContent = `${taskData.title}: ${taskData.description}`;
    taskItem.setAttribute('data-task-id', taskData.id); // Asigna el ID de la tarea como un atributo

    // Botón de edición
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = function() { prepareEditTask(taskData.id, taskItem); };

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

// Prepara el formulario para la edición de una tarea
function prepareEditTask(taskId, taskItem) {
    // Extrae el título y la descripción directamente del contenido del elemento de lista
    const [title, description] = taskItem.textContent.replace('EditDelete', '').split(': '); // Elimina el texto de los botones

    // Rellena el formulario con los valores actuales de la tarea
    document.getElementById("task-title").value = title;
    document.getElementById("task-description").value = description;

    // Marca el formulario como en modo edición y guarda el ID de la tarea que se está editando
    const form = document.getElementById("task-form");
    form.dataset.isEditing = 'true';
    form.dataset.taskId = taskId;
}

// Actualiza una tarea existente
function updateTask(taskId) {
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-description").value;

    const updateTaskUrl = `https://task1manager-7ffc650e7081.herokuapp.com/api/task/${taskId}`;

    fetch(updateTaskUrl, {
        method: "PUT", // o "PATCH", dependiendo de tu backend
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: title, description: description }),
        credentials: "same-origin"
    })
    .then(response => response.json())
    .then(data => {
        // Encuentra la tarea en la lista y actualiza su contenido
        const taskItem = document.querySelector(`[data-task-id='${taskId}']`);
        if (taskItem) {
            taskItem.textContent = `${data.title}: ${data.description}`; // Actualiza el texto del elemento de lista
            addTaskToList(data); // Vuelve a añadir los botones de acción
        }
        resetForm(); // Restablece el formulario
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

// Elimina una tarea
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

// Restablece el formulario a su estado inicial
function resetForm() {
    document.getElementById("task-form").reset();
    const form = document.getElementById("task-form");
    form.dataset.isEditing = 'false';
    delete form.dataset.taskId;
}
