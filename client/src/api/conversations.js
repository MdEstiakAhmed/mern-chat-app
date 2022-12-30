import { createErrorObject } from "../utils/error";
import { getData } from "../utils/request";

const BASE_URL = `/conversations`;

export const fetchConversations = async ({ userId }) => {
    try {
        const url = `${BASE_URL}/all/${userId}`;
        const response = await getData({ url });
        return response;
    } catch (error) {
        return createErrorObject(error);
    }
};
export const fetchConversation = async ({ conversationId }) => {
    try {
        const url = `${BASE_URL}/info/${conversationId}`;
        const response = await getData({ url });
        return response;
    } catch (error) {
        return createErrorObject(error);
    }
};

export const addConversation = async ({ userId, formRef }) => {
    try {
        const url = `${BASE_URL}/add`;
    } catch (error) {
        return createErrorObject(error);
    }
};
