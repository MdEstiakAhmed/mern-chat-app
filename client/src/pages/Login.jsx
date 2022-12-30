import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import useGetContext from "../hooks/useGetContext";

const Login = () => {
    const formRef = useRef(null);
    const { userAction, authAction } = useGetContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login({ formRef });
        if (response.status) {
            userAction.setUser({
                user: response.data.user,
                token: response.data.token,
            });
            authAction.setAuth(true);
            navigate("/inbox");
        }
    };
    return (
        <>
            <div className="login-container">
                <div className="login-wrapper">
                    <h3 className="text-center">Login</h3>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="loginEmail" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="loginEmail"
                                name="username"
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="loginPassword"
                                className="form-label"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="loginPassword"
                                name="password"
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default Login;
