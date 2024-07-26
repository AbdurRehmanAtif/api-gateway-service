class ApiResponse<T> {
    public statusCode: number;
    public success: boolean;
    public message: string;
    public title: string;
    public data: T;

    constructor(statusCode: number, title: string, message: string = "success", data: T) {
        this.statusCode = statusCode;
        this.title = title
        this.success = true;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponse;
