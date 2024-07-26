import { ApiErrorResponse } from "../types/api";

class ApiError extends Error {
    public statusCode: number;
    public success: boolean;
    public title: string;
    public errorLog?: string;
    public stack?: string;

    constructor(err: ApiErrorResponse) {
        super(err.message || err.title); // Use the message or title from the error response
        this.name = "ApiError"; // Set the name property to "ApiError" (optional)

        // Assign properties from the error response
        this.statusCode = err.statusCode;
        this.success = err.success;
        this.title = err.title;
        this.errorLog = err.errorLog;
        this.stack = err.stack;
        this.errorLog = err.title
        // Capture stack trace if available
        if (err.stack) {
            this.stack = err.stack;
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;
