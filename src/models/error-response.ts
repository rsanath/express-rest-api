/**
 * The structure of the error response
 */
export default interface ErrorResponse {
    message: string;
    description?: string;
    errors?: any[];
}
