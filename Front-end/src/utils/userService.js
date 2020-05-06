import apiRequestHelper from './apiService';
import tokenService from './tokenService';
const URL = '/api/users';

async function loginUser(data = { email: undefined, password: undefined }) {
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

async function signupUser(
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
    return apiRequestHelper('GET', url, true, data);
}

function deleteUser() {
    const url = `${URL}/me`;
    return apiRequestHelper('GET', url, true);
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
