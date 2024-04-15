

document.addEventListener("DOMContentLoaded", function() {
    loadUserTasks();

    document.getElementById("task-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-description").value;

        const userDataString = localStorage.getItem('userData');
        if (!userDataString) {
            console.error("User data not found in localStorage.");
            return;
        }
        const userData = JSON.parse(userDataString);
        const userId = userData.userId;

        // const createTaskUrl = "http://localhost:3000/api/task";

        const createTaskUrl = 'https://task1manager-7ffc650e7081.herokuapp.com/api/task'

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
            loadUserTasks();

            document.getElementById("task-title").value = "";
            document.getElementById("task-description").value = "";
        })
        .catch(error => console.error("Error:", error));
    });
});


function loadUserTasks() {
     const tasks = [
        { id: 1, title: "Task 1", description: "Description 1", completed: false },
        { id: 2, title: "Task 2", description: "Description 2", completed: true }
    ];
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
        console.log("User data not found in localStorage.");
        return;
    }
    const userData = JSON.parse(userDataString);

    fetch(`https://task1manager-7ffc650e7081.herokuapp.com/api/task/user/${userData.userId}/tasks`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(response => response.json())
    .then(tasks => {
        const tasksList = document.getElementById("tasks");
        tasksList.innerHTML = '';

        tasks.forEach(task => {
            const taskItem = document.createElement("li");
            taskItem.setAttribute('data-id', task._id);

            function toggleTaskCompleted(taskId, completed) {
    // Aquí deberías hacer una solicitud al servidor para actualizar el estado de la tarea
    console.log(`Task ${taskId} completion status: ${completed}`);
}

            // Create the checkbox
            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.checked = task.completed; // Assume your task objects have a 'completed' property
            checkBox.addEventListener('change', () => toggleTaskCompleted(task.id, checkBox.checked));


            const taskInfo = document.createElement("div");

            const taskTitle = document.createElement("strong");
            taskTitle.textContent = task.title + ": ";
            taskInfo.appendChild(taskTitle);

            const taskDescription = document.createElement("span");
            taskDescription.textContent = task.description;
            taskInfo.appendChild(taskDescription);

            taskItem.appendChild(taskInfo);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.style.marginLeft = "10px";
            deleteButton.onclick = function() {
                deleteTask(task._id, taskItem);
            };
            taskItem.appendChild(deleteButton);

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.style.marginLeft = "10px";
            editButton.onclick = function() {
                editTask(task._id, taskItem, taskTitle, taskDescription);
            };
            taskItem.appendChild(editButton);

            tasksList.appendChild(taskItem);
        });
    })
    .catch(error => console.error("Error loading tasks:", error));
}

function deleteTask(taskId, taskElement) {
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
            taskElement.remove();
        } else {
            console.error("Failed to delete task.");
        }
    })
    .catch(error => console.error("Error deleting task:", error));
}

function editTask(taskId, taskElement, taskTitleElement, taskDescriptionElement) {
    const newTitle = prompt("New title:", taskTitleElement.textContent.replace(": ", ""));
    const newDescription = prompt("New description:", taskDescriptionElement.textContent);

    if (newTitle != null && newDescription != null) {
        fetch(`https://task1manager-7ffc650e7081.herokuapp.com/api/task/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: newTitle, description: newDescription }),
            credentials: "same-origin"
        })
        .then(response => response.json())
        .then(updatedTask => {
            taskTitleElement.textContent = updatedTask.title + ": ";
            taskDescriptionElement.textContent = updatedTask.description;
        })
        .catch(error => console.error("Error updating task:", error));
    }
}

function toggleTaskCompleted(taskId, completed) {
    // Aquí deberías hacer una solicitud al servidor para actualizar el estado de la tarea
    console.log(`Task ${taskId} completion status: ${completed}`);
}

document.getElementById("logout-button").addEventListener("click", function() {
    logout();  // Llama a la función de logout definida
});


document.addEventListener("DOMContentLoaded", function() {
    if (!checkAuthentication()) {
        return; // Si no está autenticado, detiene la ejecución y redirige
    }

    loadUserTasks();

    document.getElementById("task-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-description").value;
        const userDataString = localStorage.getItem('userData');
        if (!userDataString) {
            console.error("User data not found in localStorage.");
            return;
        }
        const userData = JSON.parse(userDataString);
        const userId = userData.userId;

        // const createTaskUrl = 'https://task1manager-7ffc650e7081.herokuapp.com/api/task';
        // fetch(createTaskUrl, {
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify({ userId: userId, title: title, description: description }),
        //     credentials: "same-origin"
        // })
        // .then(response => response.json())
        // .then(() => {
        //     loadUserTasks(); // Recargar las tareas después de añadir una nueva
        //     document.getElementById("task-title").value = "";
        //     document.getElementById("task-description").value = "";
        // })
        // .catch(error => console.error("Error:", error));
    });
});

function checkAuthentication() {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
        console.error("No user data found, redirecting to login...");
        window.location.replace('/login.html'); // Redirige al login si no está autenticado
        return false;
    }
    return true;
}

function loadUserTasks() {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
        console.log("User data not found in localStorage.");
        return;
    }
    const userData = JSON.parse(userDataString);

    fetch(`https://task1manager-7ffc650e7081.herokuapp.com/api/task/user/${userData.userId}/tasks`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(tasks => {
        const tasksList = document.getElementById("tasks");
        tasksList.innerHTML = ''; // Limpiar la lista antes de añadir elementos nuevos
        tasks.forEach(task => {
            const taskItem = document.createElement("li");
            taskItem.className = "task-item"; //
            taskItem.setAttribute('data-id', task._id);

            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.checked = task.completed;
            checkBox.addEventListener('change', () => toggleTaskCompleted(task._id, checkBox.checked));

            const taskInfo = document.createElement("div");
            taskInfo.className = "task-info"; // 

            const taskTitle = document.createElement("strong");
            taskTitle.textContent = task.title + ": ";
            const taskDescription = document.createElement("span");
            taskDescription.textContent = task.description;

            taskInfo.appendChild(taskTitle);
            taskInfo.appendChild(taskDescription);
            taskItem.appendChild(checkBox);
            taskItem.appendChild(taskInfo);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-button"; // Agregar clase para estilos si es necesario
            deleteButton.onclick = function() {
                deleteTask(task._id, taskItem);
            };

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.className = "edit-button"; // Agregar clase para estilos si es necesario
            editButton.onclick = function() {
                editTask(task._id, taskItem, taskTitle, taskDescription);
            };

            taskItem.appendChild(deleteButton);
            taskItem.appendChild(editButton);
            tasksList.appendChild(taskItem);
        });
    })
    .catch(error => console.error("Error loading tasks:", error));
}

function toggleTaskCompleted(taskId, completed) {
    console.log(`Task ${taskId} completion status: ${completed}`);
    // Aquí podrías añadir código para actualizar el estado de la tarea en el servidor
}

function deleteTask(taskId, taskElement) {
    const deleteTaskUrl = `https://task1manager-7ffc650e7081.herokuapp.com/api/task/${taskId}`;
    fetch(deleteTaskUrl, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            taskElement.remove();
        } else {
            console.error("Failed to delete task.");
        }
    })
    .catch(error => console.error("Error deleting task:", error));
}

function editTask(taskId, taskElement, taskTitleElement, taskDescriptionElement) {
    const newTitle = prompt("New title:", taskTitleElement.textContent.replace(": ", ""));
    const newDescription = prompt("New description:", taskDescriptionElement.textContent);
    if (newTitle != null && newDescription != null) {
        fetch(`https://task1manager-7ffc650e7081.herokuapp.com/api/task/${taskId}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ title: newTitle, description: newDescription }),
            credentials: "same-origin"
        })
        .then(response => response.json())
        .then(updatedTask => {
            taskTitleElement.textContent = updatedTask.title + ": ";
            taskDescriptionElement.textContent = updatedTask.description;
        })
        .catch(error => console.error("Error updating task:", error));
    }
}

document.getElementById("logout-button").addEventListener("click", function() {
    logout();
});

function logout() {
    console.log("Attempting to logout...");
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach(function(c) {
        const cookieName = c.split('=')[0].trim();
        document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    });
    console.log("Logout completed. Redirecting to login...");
    window.location.replace('/index.html');
}
