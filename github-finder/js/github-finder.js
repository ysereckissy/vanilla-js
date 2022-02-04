const finderInput = document.getElementById('github-finder-input');
finderInput.addEventListener('keyup', event => {
    const searchText = event.target.value.trim();
    const api = new GithubFinderApi();
    const userProfile = new UserProfileComponent();
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
           console.log(error);
        });
    } else {
        userProfile.clear();
    }
    event.preventDefault();
})