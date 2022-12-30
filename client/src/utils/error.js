export const createErrorObject = (error) => {
    return {
        status: false,
        message: error?.message || "Something went wrong",
        code: error.code || 501,
    };
};
