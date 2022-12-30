import axios from "axios";

const AppInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getData = async ({ url, headers }) => {
    try {
        const localData = await localStorage.getItem("mern_chat_app");
        const token = JSON.parse(localData || {}).token;
        const response = await AppInstance.get(url, {
            headers: { ...headers, token },
        });
        return response.data;
    } catch (error) {
        return { status: false, message: error.message };
    }
};

export const postData = async ({ url, data, headers }) => {
    try {
        const localData = await localStorage.getItem("mern_chat_app");
        let token;
        if (localData) {
            token = JSON.parse(localData || {}).token;
        }
        const response = await AppInstance.post(url, data, {
            headers: { ...headers, token },
        });
        return response.data;
    } catch (error) {
        return { status: false, message: error.message };
    }
};
