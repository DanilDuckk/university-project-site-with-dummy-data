document.getElementById('createAccountBtn').addEventListener('click', async (event) => {
    event.preventDefault();
    console.log("create account clicked");

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const no = document.getElementById('no');

    if(no.checked){
        window.location.href = 'forDuckHaters.html';
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
            window.location.href = '../index.html';
        } else {
            console.error('Failed to register');
        }
    } catch (error) {
        console.error('Error registering:', error);
    }
});

document.getElementById('loginBtn').addEventListener('click', async (event) => {
    event.preventDefault();
    console.log("login clicked");
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const no = document.getElementById('no');

    if(no.checked){
        window.location.href = 'forDuckHaters.html';
    }

    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });
        const data = await response.json();
        if (response.ok) {
            window.location.href = '../index.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});