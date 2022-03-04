async function commentHandler(event) {
    event.preventDefault();

    const content = document.querySelector('textarea[name="comment-text"]').value.trim();
    
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
            content,
            post_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentHandler);