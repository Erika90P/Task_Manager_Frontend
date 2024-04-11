 // Escuchar el envío del formulario para agregar una nueva tarea
 document.getElementById("task-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    // Obtener los valores del formulario de nueva tarea
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-description").value;
console.log("title ", title);
console.log("description ",description);
    // Especificar la URL del endpoint para crear una nueva tarea
    const createTaskUrl = "http://localhost:3000/api/task"; // Reemplaza con la URL de tu backend para crear tarea

    // Hacer una solicitud POST al backend para agregar una nueva tarea
    fetch(createTaskUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: title, description: description }),
        credentials: "same-origin"
    })
    .then(response => response.json())
    .then(data => {
        // Manejar la respuesta del backend
        console.log(data); // Puedes hacer algo con la respuesta, como actualizar la lista de tareas en el frontend
    })
    .catch(error => {
        console.error("Error:", error); // Manejar errores de la solicitud
    });
});

