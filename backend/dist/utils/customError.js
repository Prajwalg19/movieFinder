"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendedError = void 0;
class extendedError extends Error {
}
exports.extendedError = extendedError;
function customError(message, statusCode) {
    const error = new extendedError();
    error.message = message;
    error.statusCode = statusCode;
    return { message, statusCode };
}
exports.default = customError;
