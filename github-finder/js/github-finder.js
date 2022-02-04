(() => {
    const finderInput = document.getElementById('github-finder-input');
    const api = new GithubFinderApi();
    const userProfile = new UserProfileComponent();
    const userRepositories = new UserRepositories();

    finderInput.addEventListener('keyup', event => {
        const searchText = event.target.value.trim();
        if(searchText) {
            api.fetchUser(searchText).then(user => {
                const notFound = user.message && ('Not Found' === user.message);
                if(notFound) {
                    Utils.showAlert('User Not Found', 'alert alert-danger')
                    window.setTimeout(() => Utils.clearAlert(), 2000);
                } else {
                    Utils.clearAlert();
                    userProfile.render(user);
                }
            }).catch(error => {
                console.error(error);
            });

            api.fetchRepositories(searchText)
                .then(repositories => {
                    const notFound = repositories.message && ('Not Found' === repositories.message);
                    if(!notFound) {
                        userRepositories.clear();
                        userRepositories.renderComponentHeader();
                        userRepositories.render(repositories);
                    }
                })
        } else {
            userProfile.clear();
            userRepositories.clear();
        }
        event.preventDefault();
    })
})();