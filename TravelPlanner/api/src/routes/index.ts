import { Express } from 'express';
import tripRoutes from '../modules/Trips/Trip.routes';
import { errorHandler } from '../middleware/error/errorHandlerMiddleware';


const registerRoutes = (app: Express) => {
    app.use('/', tripRoutes);

    //should be placed AFTER all routes
    app.use(errorHandler);
    app.use("/", tripRoutes);
};

export { registerRoutes };