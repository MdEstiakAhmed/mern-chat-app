import { createErrorObject } from "../utils/error";
import { getData, postData } from "../utils/request";

const BASE_URL = `/messages`;

export const fetchMessages = async ({ conversationId }) => {
    try {
        const url = `${BASE_URL}/${conversationId}`;
        const response = await getData({ url });
        return response;
    } catch (error) {
        return createErrorObject(error);
    }
};

export const addMessage = async ({ bodyObject }) => {
    try {
        const url = `${BASE_URL}/add`;
        const formData = new FormData();
        for (const key in bodyObject) {
            formData.append(key, bodyObject[key]);
        }
        const response = await postData({ url, data: formData });
        return response;
    } catch (error) {
        return createErrorObject(error);
    }
};
