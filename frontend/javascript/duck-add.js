document.getElementById('uploadButton').addEventListener('click', async function() {
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
        } else {
            alert("Need to make an account before creating a duck!");
            console.error('Failed to add duck.');
        }
    } catch (error) {
        console.error('Error adding duck:', error);
    }
});
