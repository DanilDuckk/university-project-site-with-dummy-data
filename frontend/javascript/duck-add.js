const statusMessages = {
    200: "OK",
    201: "Created",
    204: "No Content",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
};

document.getElementById('uploadButton').addEventListener('click', function() {
    const imageContainer = document.getElementById('imageContainer');
    const imageUrl = document.getElementById('imageUrl').value.trim();
    imageContainer.innerHTML = '';

    if (imageUrl) {
        const img = document.createElement('img');
        img.classList.add('square');
        img.src = imageUrl;
        img.alt = 'User provided image';
        imageContainer.appendChild(img);
    } else {
        console.error('No URL provided');
    }
});

document.getElementById('createDuck').addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const imageUrl = document.getElementById('imageUrl').value.trim();
    const userId = localStorage.getItem('userId');

    try {
        const response = await fetch(`http://localhost:3000/ducks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-ID': userId
            },
            body: JSON.stringify({ image_url: imageUrl, name: name })
        });

        if (response.ok) {
            window.location.href = "../index.html";
        } else if (response.status === 401) {
            alert("Need to make an account before creating a duck!");
            console.error(`Failed to add duck - Unauthorized. Status: ${response.status} (${statusMessages[response.status] || "Unknown Status"})`);
        } else if (response.status >= 500) {
            alert("Need to make an account before creating a duck!");
            console.error(`Failed to add duck - Server Error. Status: ${response.status} (${statusMessages[response.status] || "Unknown Status"})`);
        } else {
            alert("Need to make an account before creating a duck!");
            console.error(`Failed to add duck - Unknown Error. Status: ${response.status} (${statusMessages[response.status] || "Unknown Status"})`);
        }
    } catch (error) {
        console.error('Error adding duck:', error);
    }
});
