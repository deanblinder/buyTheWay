import TYPES from '../Types';

const userInitialState = {
    userData: {},
    loggedIn: false,
};

export const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case TYPES.SET_USER_DATA:
            return {
                ...state,
                userData: action.userData,
            }
        case TYPES.SET_LOGGED_IN:
            return {
                ...state,
                loggedIn: action.flag,
            }
        default:
            return state;
    }
}

