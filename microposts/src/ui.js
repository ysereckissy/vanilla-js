
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
    clearId = () => this.idInput.value = '';
    clearForm = () => {
        this.clearId();
        this.clearTitle();
        this.clearBody();
    }

    showEditControls = () => {
        this.postSubmit.textContent = 'Update Post';
        this.postSubmit.className = 'post-submit btn btn-warning btn-block';
    }

    insertCancelButton = () => {
        const button = document.createElement('button');
        button.className = 'post-cancel btn btn-light btn-block';
        button.appendChild(document.createTextNode('Cancel Edit'));

        const cardForm = document.querySelector('.card-form');
        const formEnd = document.querySelector('.form-end');
        cardForm.insertBefore(button, formEnd);
    }

    showAddPostControls = () => {
        this.postSubmit.textContent = 'Post It';
        this.postSubmit.className = 'post-submit btn btn-primary btn-block';
    }

    fillForm = post => {
        this.titleInput.value = post.title;
        this.bodyInput.value = post.body;
        this.idInput.value = post.id;
    }
    getState = () => this.forState;
    getPostedId = () => this.idInput.value;

    setState = state => {
        this.forState = state;
        const savedClassName = this.postSubmit.className;
        const savedContent = this.postSubmit.textContent;
        if('edit' === state) {
            this.showEditControls();
            this.insertCancelButton();
        } else {
            if(document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }
            this.showAddPostControls();
            this.clearForm();
        }
    }

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