document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const loginUrl = "https://task1manager-7ffc650e7081.herokuapp.com/api/user/login";

        fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password }),
        })
        .then(response => response.json().then(data => ({ ok: response.ok, data })))
        .then(({ ok, data }) => {
            if (ok) {
                console.log(data);
                if (data.message === 'Login successful') {
                    // Si la autenticación fue exitosa, puedes almacenar el hecho de que el usuario está logueado,
                    // pero no el token si es httpOnly, eso lo manejará automáticamente el navegador.
                    sessionStorage.setItem('isAuthenticated', 'true');
                    // Redirigir a la página deseada
                    // window.location.href = "/task.html";
                }
            } else {
                // Manejo de respuesta no exitosa
                console.error(data.error); // Muestra un mensaje de error basado en la respuesta
                alert(data.error); // O cualquier otra forma de notificación al usuario
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error logging in: " + error.message); // Notificación del error al usuario
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
