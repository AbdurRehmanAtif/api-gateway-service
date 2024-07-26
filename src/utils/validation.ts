import ApiError from './apiError'; // Assuming the correct import path

interface Params {
    [key: string]: any;
}

const Validation = {
    // Asynchronous method for basic validation of parameters
    async basicValidation(params: Params): Promise<void> {
        try {
            // Check if params is truthy (not null or undefined)
            if (params) {
                // Convert the params object to an array of [key, value] pairs
                const bodyArray = Object.entries(params);
                // Iterate through the array to check if any value is empty
                for (const [key, value] of bodyArray) {
                    // If a value is empty, reject the promise with a validation error
                    if (!value || !key) {
                        throw new ApiError({ success: false, statusCode: 404, title: "Validation Error", message: `Validation failed: ${key} cannot be empty.` });
                    }
                }
            }
        } catch (error) {
            // If an error occurs during validation, throw the error
            throw error;
        }
    }
};

export default Validation;
