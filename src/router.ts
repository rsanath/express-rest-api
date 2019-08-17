import express from 'express';
import middlewares from './middleware';
import errorHandlers from './middleware/error-handlers';
import routes from './service';
import { applyMiddlewares, applyRoutes } from './utils';

// setup routes, middlewares and error handlers
const router = express();
applyMiddlewares(middlewares, router);
applyRoutes(routes, router, '/api/v1');
applyMiddlewares(errorHandlers, router);

// format the response payload
router.set('json spaces', 2);

// export the router
export default router;
