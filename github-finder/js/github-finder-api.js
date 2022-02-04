class UserFetcher
{
    constructor(apiUrl, urlFragment = `users`) {
        this.apiUrl = apiUrl;
        this.urlFragment = urlFragment;
    }

    fetchUser = async (credential, username='') => {
        const response = await fetch(
            `${this.apiUrl}/${this.urlFragment}/${username}`,
            {
                headers: {
                    authorization: `token ${credential.token}`
                }
            }).catch(error => {

        });
        const user = await response.json();

        return user;
    }
}

class RepositoryFetcher {
    constructor(apiUrl, urlFragment = 'repos') {
        this.apiUrl = apiUrl;
        this.urlFragment = urlFragment;
    }

}
class GithubFinderApi {

    static credentials = {
        token: "ADD_YOUR_TOKEN"
    };
    static URL = `https://api.github.com`;

    constructor() {
        this.userFetcher = new UserFetcher(GithubFinderApi.URL, `users`);
    }

    fetchUser = userName => this.userFetcher.fetchUser(GithubFinderApi.credentials, userName);
}

const api = new GithubFinderApi;
api.fetchUser('ysereckissy')
    .then(user => {
        ///console.log(user);
    }).catch(err => {
        ///console.error(err);
});
