export class extendedError extends Error {
    statusCode: number | undefined;
}

function customError(message: string, statusCode: number) {
    const error = new extendedError();
    error.message = message;
    error.statusCode = statusCode;
    return {message, statusCode};
}

export default customError;
