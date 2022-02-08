class UI {
    constructor() {
        this.posts = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add'
    }

    postTitle = () => this.titleInput.value;
    postBody = () => this.bodyInput.value;
    clearTitle = () => this.titleInput.value = '';
    clearBody = () => this.bodyInput.value = '';

    showPosts = posts => {
        let output = '';
        posts.forEach(post => {
            output += `
            <div class="card mb-3">
                <div class="card-body">
                   <h4 class="card-title">${post.title}</h4> 
                   <p class="card-text">${post.body}</p>
                   <a href="#" class="edit card-link" data-id="${post.id}">
                    <i class="fa fa-pencil"></i>
                   </a>
                   <a href="#" class="delete card-link" data-id="${post.id}">
                    <i class="fa fa-remove"></i>
                   </a>
                </div>
            </div>
            `;
        });
        this.posts.innerHTML = output;
    }

    showAlert = (message, className) => {
        this.clearAlert();
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.post-container');
        container.insertBefore(div, this.posts);
        setTimeout(() => this.clearAlert(), 3000);
    }

    clearAlert = () => {
        const alert = document.querySelector('.alert');
        if(alert) {
            alert.remove();
        }
    }
}

const ui = new UI();
export default ui;