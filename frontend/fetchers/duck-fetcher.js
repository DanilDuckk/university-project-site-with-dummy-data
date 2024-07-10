async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/ducks');
        if (!response.ok) {
            console.error(`Error fetching data. Status: ${response.status} (${StatusCodes.getStatusText(response.status)})`);
            return [];
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await fetchData();
        const ducksContainer = document.getElementById('duck-list');

        //document.getElementById("logout").innerText = `User: ${userId}`;

        data.forEach(duck => {
            const duckDiv = document.createElement('div');
            duckDiv.classList.add('duck-list');

            const duckImage = document.createElement('img');
            duckImage.classList.add('duck-image');
            duckImage.src = duck.image_url;
            duckImage.alt = duck.name;
            duckDiv.appendChild(duckImage);

            duckImage.addEventListener('click', function() {
                const baseURL = window.location.href.split('/').slice(0, -1).join('/'); // Get base URL without the current page name
                window.location.href = `${baseURL}/pages/commentPage.html?duckId=${duck.id}`;
            });

            const textDiv = document.createElement('div');
            textDiv.classList.add('small-text');

            const speciesP = document.createElement('p');
            speciesP.textContent = `Species: ${duck.name}`;
            textDiv.appendChild(speciesP);

            const creatorP = document.createElement('p');
            creatorP.textContent = `Creator: ${duck.creator}`;
            textDiv.appendChild(creatorP);

            const likesP = document.createElement('p');
            likesP.textContent = `Likes: ${duck.likes}`;
            textDiv.appendChild(likesP);

            const buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('buttons-sorted');

            const likeButton = document.createElement('button');
            likeButton.classList.add('like-button');
            likeButton.textContent = 'Like';
            likeButton.addEventListener('click', async function () {
                try {
                    const response = await fetch(`http://localhost:3000/ducks/${duck.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            userId: localStorage.getItem('userId')
                        },
                        body: JSON.stringify({ likes: duck.likes + 1 }),
                    });
                    if (!response.ok) {
                        console.error(`Failed to update likes. Status: ${response.status} (${StatusCodes.getStatusText(response.status)})`);
                        return;
                    }
                    duck.likes++; // Update local data
                    likesP.textContent = `Likes: ${duck.likes}`;
                } catch (error) {
                    console.error('Error updating likes:', error);
                }
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async function () {
                try {
                    const response = await fetch(`http://localhost:3000/ducks/${duck.id}`, {
                        method: 'DELETE',
                    });
                    if (!response.ok) {
                        console.error(`Failed to delete duck. Status: ${response.status} (${StatusCodes.getStatusText(response.status)})`);
                        return;
                    }
                    ducksContainer.removeChild(duckDiv);
                } catch (error) {
                    console.error('Error deleting duck:', error);
                }
            });

            buttonsDiv.appendChild(likeButton);
            buttonsDiv.appendChild(deleteButton);
            textDiv.appendChild(buttonsDiv);

            duckDiv.appendChild(textDiv);
            ducksContainer.appendChild(duckDiv);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});