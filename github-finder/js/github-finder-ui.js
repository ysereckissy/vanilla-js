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