import React, { createContext, useReducer } from "react";
import userReducer, { handleUser } from "./user/reducer";
import authReducer, { handleAuth } from "./auth/reducer";

const Context = createContext();

const Provider = (props) => {
    const [userState, userDispatch] = useReducer(userReducer, {});
    const userAction = handleUser(userDispatch);
    const [authState, authDispatch] = useReducer(authReducer, undefined);
    const authAction = handleAuth(authDispatch);

    let contextValue = {
        userState,
        authState,
        userAction,
        authAction,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export { Context, Provider };
