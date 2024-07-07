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

document.getElementById('createDuck').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const imageUrl = document.getElementById('imageUrl').value.trim();

    fetch(`http://localhost:3000/ducks`, { // TO DO
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image_url: imageUrl, name: name })
    })
        .then(response => {
            if (response.ok) {
                window.location.href="../index.html";
            } else {
                alert("Need to make an account before creating a duck!")
                console.error('Failed to add duck.');
            }
            })
            .catch(error => {
                console.error('Error adding duck:', error);
            });

});