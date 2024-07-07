document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const duckId = urlParams.get('duckId');

    fetch(`http://localhost:3000/ducks/clicked/${duckId}`) // Adjust URL as per your server setup
        .then(response => response.json())
        .then(duck => {
            const duckDetails = document.getElementById('duck-details');
            duckDetails.classList.add('comment-duck');

            const duckImage = document.createElement('img');
            duckImage.classList.add('duck-comment-image');
            duckImage.src = duck.image_url;
            duckImage.alt = duck.name;
            duckDetails.appendChild(duckImage);

            const textDiv = document.createElement('div');
            textDiv.classList.add('small-text');

            const speciesP = document.createElement('p');
            speciesP.textContent = `Species: ${duck.name}`;
            speciesP.classList.add('small-text');
            textDiv.appendChild(speciesP);

            const likesP = document.createElement('p');
            likesP.textContent = `Likes: ${duck.likes}`;
            likesP.classList.add('small-text');
            textDiv.appendChild(likesP);

            const creatorP = document.createElement('p');
            creatorP.textContent = `Creator: ${duck.creator}`;
            creatorP.classList.add('small-text');
            textDiv.appendChild(creatorP);

            duckDetails.appendChild(textDiv);


            fetch(`http://localhost:3000/comments/duck/${duckId}`)
                .then(response => response.json())
                .then(comments => {
                    const commentsContainer = document.getElementById('comments-container');

                    comments.forEach(comment => {
                        const commentP = document.createElement('p');
                        commentP.textContent = `${comment.creator}: ${comment.content}`;
                        commentP.classList.add('small-text');
                        commentsContainer.appendChild(commentP);
                    });
                })
                .catch(error => {
                    console.error('Error fetching comments:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching duck details:', error);
        });

    const submitButton = document.getElementById('submit-comment');
    const commentInput = document.getElementById('comment');

    submitButton.addEventListener('click', () => {
        const newComment = commentInput.value.trim();

        if (newComment) {
            fetch(`http://localhost:3000/comments/addComment`, { // TO DO
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'userId': 20
                },
                body: JSON.stringify({ duck_id: duckId, content: newComment })
            })
                .then(response => {
                    if (response.ok) {
                        commentInput.value = '';
                        location.reload()
                    } else {
                        alert("Need to make an account before commenting!")
                        console.error('Failed to submit comment.');
                    }
                })
                .catch(error => {
                    console.error('Error submitting comment:', error);
                });
        }
    });
});