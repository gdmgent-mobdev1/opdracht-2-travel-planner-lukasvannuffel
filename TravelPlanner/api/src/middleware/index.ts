import * as bodyParser from 'body-parser';
import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

const registerMiddleware = (app: Express) => {

//json
app.use(express.json());

//Helmet
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());

//Cors
app.use(cors());

//Compression
app.use(compression());

};

export { registerMiddleware };