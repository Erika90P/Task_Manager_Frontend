

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
