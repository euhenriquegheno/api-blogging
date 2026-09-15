import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
interface ErrorHandlerMap {
    [key: string]: (error: Error | ZodError, request: FastifyRequest, reply: FastifyReply) => void;
}
export declare const errorHandlerMap: ErrorHandlerMap;
export declare const globalErrorHandler: (error: Error, _: FastifyRequest, reply: FastifyReply) => void | FastifyReply<import("fastify").RouteGenericInterface, import("fastify").RawServerDefault, import("node:http").IncomingMessage, import("node:http").ServerResponse<import("node:http").IncomingMessage>, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, unknown>;
export {};
//# sourceMappingURL=global-error-handler.d.ts.map