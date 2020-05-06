function setToken(token) {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
}

function updateToken(token) {
    if (token) {
        localStorage.setItem('token', token);
    }
}

function getToken() {
    let token = localStorage.getItem('token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        //? atob() - decoding a base-64 encoded string. It is used to decode a string of data which has been encoded using the btoa() method.
        //? JSON.parse - Converting back a json object(
        if (payload.exp < Date.now() / 1000) {
            localStorage.removeItem('token');
            token = null;
        }
    }
    return token;
}

function getUserFromToken() {
    const token = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])) : null;
}

function removeToken() {
    localStorage.removeItem('token');
}

export default {
    setToken,
    getToken,
    getUserFromToken,
    removeToken,
    updateToken
};
