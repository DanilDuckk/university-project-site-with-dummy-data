document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const duckId = urlParams.get('duckId');

    try {
        const response = await fetch(`http://localhost:3000/ducks/clicked/${duckId}`);
        if (!response.ok) {
            console.error(`Error fetching duck details. Status: ${response.status} (${getReasonPhrase(response.status)})`);
            return;
        }
        const duck = await response.json();

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

        try {
            const commentsResponse = await fetch(`http://localhost:3000/comments/duck/${duckId}`);
            if (!commentsResponse.ok) {
                console.error(`Error fetching comments. Status: ${commentsResponse.status} (${getReasonPhrase(commentsResponse.status)})`);
                return;
            }
            const comments = await commentsResponse.json();
            const commentsContainer = document.getElementById('comments-container');

            comments.forEach(comment => {
                const commentP = document.createElement('p');
                commentP.textContent = `${comment.creator}: ${comment.content}`;
                commentP.classList.add('small-text');
                commentsContainer.appendChild(commentP);
            });
        } catch (commentsError) {
            console.error('Error fetching comments:', commentsError);
        }
    } catch (duckError) {
        console.error('Error fetching duck details:', duckError);
    }

    const submitButton = document.getElementById('submit-comment');
    const commentInput = document.getElementById('comment');

    submitButton.addEventListener('click', async () => {
        const newComment = commentInput.value.trim();

        if (newComment) {
            const userId = localStorage.getItem('userId');
            try {
                const response = await fetch(`http://localhost:3000/comments/addComment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'User-ID': userId
                    },
                    body: JSON.stringify({ duck_id: duckId, content: newComment })
                });

                if (response.ok) {
                    commentInput.value = '';
                    location.reload();
                } else {
                    alert(`Need to make an account before commenting! Status: ${response.status} (${getReasonPhrase(response.status)})`);
                    console.error(`Failed to submit comment. Status: ${response.status} (${getReasonPhrase(response.status)})`);
                }
            } catch (submitError) {
                console.error('Error submitting comment:', submitError);
            }
        }
    });
});
