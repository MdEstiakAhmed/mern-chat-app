import { createErrorObject } from "./error";

export const domRefToObject = (domRef) => {
    try {
        const obj = {};
        [...domRef.current].forEach((item) => {
            item.name && (obj[item.name] = item.value);
        });
        return obj;
    } catch (error) {
        return createErrorObject(error);
    }
};
