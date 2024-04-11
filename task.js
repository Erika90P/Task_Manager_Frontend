document.getElementById("task-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    // Obtener los valores del formulario de nueva tarea
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-description").value;

    // Obtener el userId del usuario actualmente autenticado (suponiendo que ya tienes este valor disponible)
    const userId = obtenerUserId();

    // Especificar la URL del endpoint para crear una nueva tarea
    const createTaskUrl = "https://task1manager-7ffc650e7081.herokuapp.com/api/task";

    // Hacer una solicitud POST al backend para agregar una nueva tarea, incluyendo el userId
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
        // Manejar la respuesta del backend
        console.log(data);

        // Crear un nuevo elemento de lista para la tarea
        const taskItem = document.createElement("li");
        taskItem.textContent = data.title; // Suponiendo que la respuesta del servidor contiene el título de la tarea

        // Agregar la tarea a la lista de tareas
        const tasksList = document.getElementById("tasks");
        tasksList.appendChild(taskItem);

        // Limpiar los campos del formulario después de agregar la tarea
        document.getElementById("task-title").value = "";
        document.getElementById("task-description").value = "";
    })
    .catch(error => {
        console.error("Error:", error); // Manejar errores de la solicitud
    });
});

// Función para obtener el userId del usuario actualmente autenticado
function obtenerUserId() {
    // Aquí debes implementar la lógica para obtener el userId del usuario actual
    // Por ejemplo, si estás utilizando algún sistema de autenticación de usuarios, podrías obtenerlo de allí
    // Si estás utilizando un backend con sesión de usuario, podrías obtenerlo desde allí
    // Por simplicidad, este ejemplo asume que ya tienes el userId disponible
    return "userIdEjemplo"; // Reemplaza esto con la lógica para obtener el userId real
}
