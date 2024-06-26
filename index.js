document.addEventListener("DOMContentLoaded", function() {
    // Assuming you have a form with an ID of 'login-form'
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevents the default form submission behavior

        // Collects values from form fields
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        // URL of the login endpoint (adjust as necessary for your environment)
        // const loginUrl = 'http://localhost:3000/api/user/login';

        const loginUrl = 'https://task1manager-7ffc650e7081.herokuapp.com/api/user/login'

        // Performs the fetch request to the server
        fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
            // credentials: 'include', // Necessary if your endpoint requires cookies to be sent
        })
        .then(response => response.json()) // Parses the JSON response
        .then(data => {
            if (data.message === 'Login successful') {
                // Assuming 'token' and 'userData' are part of the response body
                console.log(data)
                localStorage.setItem('token', data.token); // Saves token to localStorage
                localStorage.setItem('userData', JSON.stringify(data.userData)); // Saves user data to localStorage

                // Redirects to the task.html page upon successful login
                window.location.href = "/task.html";
            } else {
                // Handles scenarios where login is not successful
                console.error(data.error);
                alert(data.error);
            }
        })
        .catch(error => {
            // Handles any errors that occurred during the fetch operation
            console.error("Error:", error);
            alert("Error logging in: " + error.message);
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
