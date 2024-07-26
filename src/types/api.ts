
export interface ApiErrorResponse {
    success: boolean,
    statusCode: number,
    title: string,
    errorLog?: string,
    message?: string,
    stack?: string
}
// Define interface for API response
export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}
