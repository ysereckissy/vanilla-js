class UserProfileComponent {
    constructor() {
        this.profile = document.getElementById('profile');
    }
    _render = user => {
        const profileMarkup = `
        <div class="card card-body mb-3">
            <div class="row">
                <div class="col-md-3">
                    <img src="${user.avatar_url}" alt="User Avatar" class="img-fluid mb-2"> 
                    <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block">View Profile</a>
                </div> 
                <div class="col-md-9">
                   <span class="badge bg-primary">Public Repos: ${user.public_repos}</span>
                   <span class="badge bg-secondary">Public Gists: ${user.public_gists}</span>
                   <span class="badge bg-success">Public Followers: ${user.public_followers || 'No follower'}</span>
                   <span class="badge bg-info">Public Following: ${user.public_following || 'Following no one'}</span>
                    <ul class="list-group">
                        <li class="list-group-item">Company: ${user.company || 'No company provided'}</li> 
                        <li class="list-group-item">Website/Blog: ${user.blog || 'No website provided'}</li> 
                        <li class="list-group-item">Location: ${user.location || 'No location provided'}</li> 
                        <li class="list-group-item">Member Since: ${user.created_at}</li> 
                    </ul>
                </div> 
                
            </div> 
        </div>
        `;
        return profileMarkup;
    }

    render = (user) => {
        this.profile.innerHTML = `${this._render(user)}`;
    }

    clear = () => {
        this.profile.innerHTML =  ``;
    }
}

class UserRepositories {
    constructor(props) {
        this.container = document.getElementById('repositories');
    }

    _render = repository => {
        const html = `
            <div class="card card-body mb-2">
                <div class="row">
                    <div class="col-md-6">
                        <a href="${repository.html_url}" target="_blank">${repository.name}</a>
                    </div>
                    <div class="col-md-6">
                       <span class="badge bg-primary">Stars: ${repository.stargazers_count}</span>
                       <span class="badge bg-secondary">Watchers: ${repository.watchers_count}</span>
                       <span class="badge bg-success">Forks: ${repository.forks_count}</span>
                    </div>
                </div>
            </div>
        `;
        return html;
    }
    render = repositories => {
        let html = '';
        repositories.forEach(repository => {
            html += this._render(repository);
        });
        this.container.innerHTML = html;
    }

    renderComponentHeader = () => {
        const header = document.querySelector('.repos-list-header');
        if(!header) {
            const container = document.querySelector('.search-container');
            const h3 = document.createElement('h3');
            h3.className = 'repos-list-header';
            h3.appendChild(document.createTextNode('Latest Repositories'));
            container.insertBefore(h3, this.container);
        }
    }

    clear = () => {
        const header = document.querySelector('.repos-list-header');
        if(header) {
            header.remove();
        }
        this.container.innerHTML = ``;
    }

}

class Utils {
    static showAlert = (message, className) => {
        Utils.clearAlert();
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.search-container');
        const search = document.querySelector('.search');

        container.insertBefore(div, search);
    }

    static clearAlert = () => {
        const alert = document.querySelector('.alert');
        if(alert) {
            alert.remove();
        }
    }
}