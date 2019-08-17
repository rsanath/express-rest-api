import { Router, RequestHandler } from 'express';

type MiddlewareWrapper = (router: Router) => void;

// Abstract middleware applying logic
export const applyMiddlewares = (
    middlewares: MiddlewareWrapper[],
    router: Router
) => middlewares.forEach(m => m(router));

// A model to define a route.
// Routes are defined without the knowledge of the framework (express).
type Route = {
    path: string;
    method: string;
    handler: RequestHandler | RequestHandler[];
};

export const applyRoutes = (
    routes: Route[],
    router: Router,
    namespace: string = '' // a prefix for all the routes defined
) => {
    routes.forEach(route => {
        const { method, handler } = route;
        const path = namespace + route.path;
        (router as any)[method](path, handler);
    });
};
