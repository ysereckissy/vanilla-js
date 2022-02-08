class EasyHTTP {
    get = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    post = async (url, data) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const respData = await response.json();
        return respData;
    }

    put = async (url, data) => {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const respData = await response.json();
        return respData;
    }

    delete = async (url) => {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        const respData = await 'Resource Deleted...';
        return respData;
    }

}

const http = new EasyHTTP();
export default http;