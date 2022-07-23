import { Router } from "express";
import { routes as userRoutes } from "./user.router";
import { routes as vendorRoutes } from "./vendor.router";
import { routes as serviceRoutes } from "./service.router";

export const routes = Router();

routes.use("/api/user", userRoutes);
routes.use("/api/vendor", vendorRoutes);
routes.use("/api/service", serviceRoutes);
