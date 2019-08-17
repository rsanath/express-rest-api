import { handleCors, parseRequestBody, logRequest } from './common';
import { handleApiDocs } from './api-docs';

// export all middlesares
export default [handleCors, parseRequestBody, handleApiDocs, logRequest];
