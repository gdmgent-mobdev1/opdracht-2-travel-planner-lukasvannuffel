import 'dotenv/config';
import mongoose from "mongoose";
import express, { Express } from "express";
import { registerRoutes } from './routes';
import { registerMiddleware } from './middleware';

const app: Express = express();


//Register middleware
registerMiddleware(app);

//Register routes
registerRoutes(app);

export default app;