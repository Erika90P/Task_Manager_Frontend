document.addEventListener("DOMContentLoaded", function() {
    // Escuchar el envío del formulario de inicio de sesión
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir el envío del formulario por defecto

        // Obtener los valores del formulario de inicio de sesión
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Especificar la URL del endpoint para iniciar sesión
        const loginUrl = "http://localhost:3000/api/user/login"; // Reemplaza con la URL de tu backend para iniciar sesión

        // Hacer una solicitud POST al backend para iniciar sesión
        fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta del backend
            console.log(data);
     // Puedes hacer algo con la respuesta, como redirigir a otra página o mostrar un mensaje al usuario
        })
        .catch(error => {
            console.error("Error:", error); // Manejar errores de la solicitud
        });
    });

    // Escuchar el envío del formulario para agregar una nueva tarea
    document.getElementById("task-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir el envío del formulario por defecto

        // Obtener los valores del formulario de nueva tarea
        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-description").value;

        // Especificar la URL del endpoint para crear una nueva tarea
        const createTaskUrl = "http://localhost:3000/api/task"; // Reemplaza con la URL de tu backend para crear tarea

        // Hacer una solicitud POST al backend para agregar una nueva tarea
        fetch(createTaskUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: title, description: description })
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

    // Escuchar el clic en el botón "Add to Calendar"
    document.getElementById("add-to-calendar").addEventListener("click", function(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del botón

        // Obtener los valores del formulario de nueva tarea
        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-description").value;

        // Especificar la URL del endpoint para agregar un evento al calendario
        const addToCalendarUrl = "http://localhost:3000/api/calendar"; // Reemplaza con la URL de tu backend para agregar evento al calendario

        // Hacer una solicitud POST al backend para agregar un evento al calendario
        fetch(addToCalendarUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: title, description: description })
        })
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta del backend
            console.log(data); // Puedes hacer algo con la respuesta, como mostrar un mensaje al usuario
        })
        .catch(error => {
            console.error("Error:", error); // Manejar errores de la solicitud
        });
    });
});
