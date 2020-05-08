import apiRequestHelper from './apiService';
import tokenService from './tokenService';
const URL = '/api/users';

function loginUser(data = { email: undefined, password: undefined }) {
    const url = `${URL}/login`;
    return apiRequestHelper('POST', url, false, data).then(({ token }) => {
        tokenService.setToken(token);
    });
}

function getUser() {
    return tokenService.getUserFromToken();
}

function getUserProfile() {
    const url = `${URL}/me`;
    return apiRequestHelper('GET', url, true);
}

function signupUser(
    data = { firstName: undefined, lastName: undefined, email: undefined, password: undefined }
) {
    const url = `${URL}/signup`;
    return apiRequestHelper('POST', url, false, data).then(({ token }) => {
        tokenService.setToken(token);
    });
}

function updateUser(
    data = { firstName: undefined, lastName: undefined, email: undefined, password: undefined }
) {
    const url = `${URL}/me`;
    return apiRequestHelper('PUT', url, true, data).then(({ token }) => {
        tokenService.updateToken(token);
    });
}

function deleteUser() {
    const url = `${URL}/me`;
    return apiRequestHelper('DELETE', url, true);
}

function logoutUser() {
    tokenService.removeToken();
}

export default {
    getUser,
    getUserProfile,
    loginUser,
    signupUser,
    updateUser,
    deleteUser,
    logoutUser
};
