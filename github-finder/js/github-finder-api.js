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
        this.limit = 5;
        this.sort = `created: asc`
    }

    fetchRepository = async (credential, login) => {
        const fullUrl = `${this.apiUrl}/users/${login}/${this.urlFragment}?per_page=${this.limit}&sort=${this.sort}`;
        const response = await fetch(fullUrl, {
            headers: {
                authorization: `token ${credential.token}`
            }
        });
        const repositories = await response.json();

        return repositories;
    }

}
class GithubFinderApi {

    static credentials = {
        token: "YOUR_TOKEN_GOES_HERE"
    };
    static URL = `https://api.github.com`;

    constructor() {
        this.userFetcher = new UserFetcher(GithubFinderApi.URL, `users`);
        this.repositoriesFetcher = new RepositoryFetcher(GithubFinderApi.URL);
    }

    fetchUser = userName => this.userFetcher.fetchUser(GithubFinderApi.credentials, userName);

    fetchRepositories = login => this.repositoriesFetcher.fetchRepository(GithubFinderApi.credentials, login);
}

const api = new GithubFinderApi;
api.fetchUser('ysereckissy')
    .then(user => {
        ///console.log(user);
    }).catch(err => {
        ///console.error(err);
});
api.fetchRepositories('ysereckissy')
    .then(repos => {
        console.log(repos);
    })
