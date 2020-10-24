import  TYPES from '../Types';

const setUserData = (userData) => ({
    type: TYPES.SET_USER_DATA,
    userData: userData,
});

const setUserLoggedIn = (flag) => ({
    type: TYPES.SET_LOGGED_IN,
    flag,
});

export const userActions = {
    setUserData,
    setUserLoggedIn,
}