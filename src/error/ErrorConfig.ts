export default {
    RecordError: {
        code: 404,
        name: "Records Error",
        messages: {
            default: "Records Error",
            recordNotFound: "Records not found",
        },
    },
    ValidationError: {
        code: 500,
        name: "Validation Error",
        messages: { default: "Validation Error" },
    },
    DbError: {
        code: -100,
        name: "Database Error",
        messages: { default: "Database Error" },
    },
};
