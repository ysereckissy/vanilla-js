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

    const data = {
        title,
        body
    }
    http.post(URL, data)
        .then(data => {
            ui.clearTitle();
            ui.clearBody();
            ui.showAlert('Post successfully added!', 'alert alert-success');
            /// Reload all posts
            loadPosts(URL);
        })
        .catch(error => console.error(error));
    e.preventDefault();
})

if (module.hot) {
    module.hot.accept();
}