document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario

        // Recolecta los valores de los campos del formulario
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        // URL del endpoint para iniciar sesión
        const loginUrl = "https://task1manager-7ffc650e7081.herokuapp.com/api/user/login";

        // Realiza la solicitud fetch al servidor
        fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password }),
            credentials: 'include', // Permite el envío de cookies/headers de autenticación en solicitudes cruzadas de dominio
        })
        .then(response => {
            // Verifica si la respuesta del servidor es exitosa
            if (!response.ok) {
                throw new Error('Network response was not ok'); // Lanza un error si la respuesta no es satisfactoria
            }
            return response.json(); // Convierte la respuesta en JSON si es exitosa
        })
        .then(data => {
            // Maneja los datos de la respuesta
            console.log(data); // Imprime los datos para depuración
            if (data.message === 'Login successful') {
                // Procede según la lógica de negocio si el inicio de sesión es exitoso
                sessionStorage.setItem('isAuthenticated', 'true'); // Almacena el estado de autenticación, por ejemplo
                // Redirige a otra página o actualiza la UI como sea necesario
                // window.location.href = "/task.html";
            } else {
                // Maneja otros mensajes o estados de la respuesta
                console.error(data.error); // Muestra errores específicos de la respuesta
                alert(data.error); // Notifica al usuario
            }
        })
        .catch(error => {
            // Maneja errores de la solicitud fetch o del procesamiento de la respuesta
            console.error("Error:", error);
            alert("Error logging in: " + error.message); // Notifica al usuario sobre el error
        });
    });
});





    // // Escuchar el envío del formulario para agregar una nueva tarea
    // document.getElementById("task-form").addEventListener("submit", function(event) {
    //     event.preventDefault(); // Prevenir el envío del formulario por defecto

    //     // Obtener los valores del formulario de nueva tarea
    //     const title = document.getElementById("task-title").value;
    //     const description = document.getElementById("task-description").value;

    //     // Especificar la URL del endpoint para crear una nueva tarea
    //     const createTaskUrl = "http://localhost:3000/api/task"; // Reemplaza con la URL de tu backend para crear tarea

    //     // Hacer una solicitud POST al backend para agregar una nueva tarea
    //     fetch(createTaskUrl, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({ title: title, description: description })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         // Manejar la respuesta del backend
    //         console.log(data); // Puedes hacer algo con la respuesta, como actualizar la lista de tareas en el frontend
    //     })
    //     .catch(error => {
    //         console.error("Error:", error); // Manejar errores de la solicitud
    //     });
    // });

    // Escuchar el clic en el botón "Add to Calendar"
    // document.getElementById("add-to-calendar").addEventListener("click", function(event) {
    //     event.preventDefault(); // Prevenir el comportamiento por defecto del botón

    //     // Obtener los valores del formulario de nueva tarea
    //     const title = document.getElementById("task-title").value;
    //     const description = document.getElementById("task-description").value;

    //     // Especificar la URL del endpoint para agregar un evento al calendario
    //     const addToCalendarUrl = "http://localhost:3000/api/calendar"; // Reemplaza con la URL de tu backend para agregar evento al calendario

    //     // Hacer una solicitud POST al backend para agregar un evento al calendario
    //     fetch(addToCalendarUrl, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({ title: title, description: description })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         // Manejar la respuesta del backend
    //         console.log(data); // Puedes hacer algo con la respuesta, como mostrar un mensaje al usuario
    //     })
    //     .catch(error => {
    //         console.error("Error:", error); // Manejar errores de la solicitud
    //     });
    // });
// });
