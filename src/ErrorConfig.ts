export default {
    recordError: {
        code: 404,
        name: "Records Error",
        messages: {
            default: "Records Error",
            recordNotFound: "Records not found",
        },
    },
    validationError: {
        code: 500,
        name: "Validation Error",
        messages: { default: "Validation Error" },
    },
    dbError: {
        code: -100,
        name: "Database Error",
        messages: { default: "Database Error" },
    },
    unknownError: {
        code: -200,
        name: "Unknown Error",
        messages: { default: "Unknown Error" },
    },
};
