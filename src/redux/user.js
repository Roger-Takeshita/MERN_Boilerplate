import userService from '../utils/userService';

const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const SIGNUP_USER = 'SIGNUP_USER';

export const loginUser = () => ({
    type: LOGIN_USER,
    payload: userService.getUser()
});

export const logoutUser = () => {
    userService.logoutUser();
    return {
        type: LOGOUT_USER
    };
};

export const signupUser = () => ({
    type: SIGNUP_USER,
    payload: userService.getUser()
});

function userReducer(state = userService.getUser(), action) {
    switch (action.type) {
        case LOGIN_USER:
            return action.payload;
        case LOGOUT_USER:
            return null;
        case SIGNUP_USER:
            return action.payload;
        default:
            return state;
    }
}

export default userReducer;
