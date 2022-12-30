import { createErrorObject } from "../utils/error";

const BASE_URL = `/users`;

export const fetchUsers = async ({}) => {
    try {
        const url = `${BASE_URL}`;
    } catch (error) {
        return createErrorObject(error);
    }
};
export const fetchUser = async ({ userId }) => {
    try {
        const url = `${BASE_URL}/${userId}`;
    } catch (error) {
        return createErrorObject(error);
    }
};

export const searchUsers = async ({ searchQuery }) => {
    try {
        const url = `${BASE_URL}/search?query=${searchQuery}`;
    } catch (error) {
        return createErrorObject(error);
    }
};

export const addUser = async ({ formRef }) => {
    try {
        const url = `${BASE_URL}/add`;
    } catch (error) {
        return createErrorObject(error);
    }
};
