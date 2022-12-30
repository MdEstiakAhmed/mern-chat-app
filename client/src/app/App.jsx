import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import useGetContext from "../hooks/useGetContext";
import Inbox from "../pages/Inbox";
import Login from "../pages/Login";
const App = () => {
    const { userAction, authAction, authState } = useGetContext();
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem("mern_chat_app");
        if (data) {
            const { user, token } = JSON.parse(data);
            if (user && token) {
                userAction.setUser({ user, token });
                authAction.setAuth();
            } else {
                navigate("/login");
                authAction.unsetAuth();
            }
        } else {
            authAction.unsetAuth();
        }
    }, []);

    return (
        <>
            {authState === true ? (
                <PrivateRoute />
            ) : authState === false ? (
                <PublicRoute />
            ) : (
                <span className="sr-only">Loading...</span>
            )}
        </>
    );
};

export default App;

const PrivateRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/inbox/:conversationId" element={<Inbox />} />
                <Route path="/inbox" element={<Inbox />} />
            </Routes>
        </>
    );
};

const PublicRoute = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/login");
    }, []);
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};
