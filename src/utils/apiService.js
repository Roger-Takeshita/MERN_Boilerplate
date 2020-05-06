const tokenService = require('./tokenService');

function apiRequestHelper(type, url, auth = false, data) {
    const option = {
        method: type,
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };
    if (auth) option.headers.Authorization = 'Bearer ' + tokenService.getToken();
    if (type === 'POST' || type === 'PUT') option.body = JSON.stringify(data);
    return fetch(url, option).then(async (res) => {
        const response = await res.json();
        if (res.ok) return response;
        throw new Error(response.message);
    });
}

export default apiRequestHelper;
