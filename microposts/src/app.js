import http from './http'
import ui from './ui'

const URL = 'http://localhost:3000/posts';

const loadPosts = url => {
    http.get(url)
        .then(data => ui.showPosts(data))
        .catch(error => console.log(error))
}
document.addEventListener('DOMContentLoaded', () => {
    loadPosts(URL);
});

document.querySelector('.post-submit').addEventListener('click', e => {
    const title = ui.postTitle();
    const body = ui.postBody();
    if (!title || !body) {
        ui.showAlert('Please fill in all fields', 'alert alert-danger');
    } else {
        if ('edit' === ui.getState() && ui.getPostedId() && parseInt(ui.getPostedId())) {
            const id = parseInt(ui.getPostedId());
            http.put(`${URL}/${id}`, {
                id,
                title,
                body
            })
                .then(data => {
                    ui.clearTitle();
                    ui.clearBody();
                    ui.showAlert('Post successfully Updated!', 'alert alert-success');
                    ui.setState('add');
                    /// Reload all posts
                    loadPosts(URL);
                })
                .catch(error => console.error(error));
        } else {
            http.post(URL, {
                title,
                body
            })
                .then(data => {
                    ui.clearTitle();
                    ui.clearBody();
                    ui.showAlert('Post successfully added!', 'alert alert-success');
                    /// Reload all posts
                    loadPosts(URL);
                })
                .catch(error => console.error(error));
        }
    }
    e.preventDefault();
});

document.querySelector('#posts').addEventListener('click', e => {
    const linkNode = e.target.parentElement;
    if (linkNode.classList.contains('delete')) {
        const id = linkNode.getAttribute('data-id');
        http.delete(`${URL}/${id}`)
            .then(() => {
                ui.showAlert('Post Deleted!', 'alert alert-danger');
                loadPosts(URL);
            })
            .catch(error => console.error(error));
    }
    e.preventDefault();
})

document.querySelector('#posts').addEventListener('click', e => {
    const linkElement = e.target.parentElement;
    if (linkElement.classList.contains('edit')) {
        const id = linkElement.getAttribute('data-id');
        const title = linkElement.parentElement.querySelector('h4').textContent;
        const body = linkElement.parentElement.querySelector('p').textContent;
        ui.fillForm({
            id,
            title,
            body
        });
        ui.setState('edit');
        /*
        http.delete(`${URL}/${id}`)
            .then(() => {
                ui.showAlert('Post Deleted!', 'alert alert-danger');
                loadPosts(URL);
            })
            .catch(error => console.error(error));

         */
        e.preventDefault();
    }
});

document.querySelector('.card-form').addEventListener('click', e => {
    if (e.target.classList.contains('post-cancel')) {
        ui.setState('add');
        /// Put this here so that the other events on the parent element continue bubbling up
        e.preventDefault();
    }
})

if (module.hot) {
    module.hot.accept();
}