import { createErrorObject } from "../utils/error";
import { domRefToObject } from "../utils/form";
import { postData } from "../utils/request";

const BASE_URL = `auth`;

export const login = async ({ formRef }) => {
    try {
        const url = `${BASE_URL}/login`;
        const requestBody = domRefToObject(formRef);
        const response = await postData({ url, data: requestBody });
        return response;
    } catch (error) {
        return createErrorObject(error);
    }
};

export const signup = async ({ formRef }) => {
    try {
        const url = `${BASE_URL}/signup`;
    } catch (error) {
        return createErrorObject(error);
    }
};
