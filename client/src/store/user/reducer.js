export const SET_USER = "SET_USER";
export const UNSET_USER = "UNSET_USER";

export const handleUser = (dispatch) => ({
    setUser: (value) =>
        dispatch({
            type: SET_USER,
            payload: value,
        }),
    unsetUser: () =>
        dispatch({
            type: UNSET_USER,
        }),
});

const userReducer = (state, action) => {
    switch (action.type) {
        case SET_USER:
            localStorage.setItem(
                "mern_chat_app",
                JSON.stringify(action.payload)
            );
            return action.payload;
        case UNSET_USER:
            localStorage.removeItem("mern_chat_app");
            return undefined;
        default:
            return state;
    }
};

export default userReducer;
