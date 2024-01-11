import { Express, Router } from "express";
import tripRoutes from "../modules/Trips/Trip.routes";
import projectRoutes from "../modules/Project/Project.routes";
import logRoutes from "../modules/Log/Log.routes";
import { errorHandler } from "../middleware/error/errorHandlerMiddleware";
import userPublicRoutes from "../modules/User/User.public.routes";
import userPrivateRoutes from "../modules/User/User.private.routes";

import { authJwt } from "../middleware/auth/authMiddleware";

const registerRoutes = (app: Express) => {
  app.use("/", userPublicRoutes);

  const authRoutes = Router();
  authRoutes.use("/", userPrivateRoutes);
  authRoutes.use("/", tripRoutes);
  authRoutes.use("/", logRoutes);
  authRoutes.use("/", projectRoutes);

  app.use(authJwt, authRoutes);

  // should be placed AFTER all routes
  app.use(errorHandler);
};

export { registerRoutes };