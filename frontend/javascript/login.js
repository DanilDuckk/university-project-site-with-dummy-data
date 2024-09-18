const statusMessages = {
    200: "OK",
    201: "Created",
    204: "No Content",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    500: "Internal Server Error",
};

document.getElementById('createAccountBtn').addEventListener('click', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const no = document.getElementById('no');

    if (no.checked) {
        window.location.href = 'forDuckHaters.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
        });

        if (response.ok) {
            alert("You have created an account! Now login!");
        } else if (response.status === 409) { // Conflict
            alert("Failed to register. Email or username already in use by another account.");
            console.error(`Failed to register - Conflict. Status: ${response.status} (${statusMessages[response.status] || "Unknown Status"})`);
        } else {
            console.error(`Failed to register - Unknown Error. Status: ${response.status} (${statusMessages[response.status] || "Unknown Status"})`);
        }
    } catch (error) {
        console.error('Error registering:', error);
    }
});

document.getElementById('loginBtn').addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const no = document.getElementById('no');

    if (no.checked) {
        window.location.href = 'forDuckHaters.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('userId', data.userId);
            window.location.href = '../index.html';
        } else if (response.status === 401) { // Unauthorized
            alert(data.message);
            console.error(`Unauthorized - Failed to login. Status: ${response.status} (${statusMessages[response.status] || "Unknown Status"})`);
        } else {
            console.error(`Failed to login - Unknown Error. Status: ${response.status} (${statusMessages[response.status] || "Unknown Status"})`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
