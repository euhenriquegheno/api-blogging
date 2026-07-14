"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.errorHandlerMap = void 0;
const zod_1 = require("zod");
exports.errorHandlerMap = {
    ZodError: (error, _, reply) => {
        return reply.status(400).send({
            message: 'Validation error',
            ...(error instanceof zod_1.ZodError && { error: error.format() }),
        });
    },
    ResourceNotFoundError: (error, _, reply) => {
        return reply.status(404).send({ message: error.message });
    },
    InvalidCredentialsError: (error, _, reply) => {
        return reply.status(401).send({ message: error.message });
    },
};
const globalErrorHandler = (error, _, reply) => {
    console.error(error);
    const handler = exports.errorHandlerMap[error.constructor.name];
    if (handler) {
        return handler(error, _, reply);
    }
    return reply.status(500).send({
        message: 'Internal server error',
    });
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=global-error-handler.js.map