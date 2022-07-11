import { Router } from "express";
import { routes as userRoutes } from "./user.router";
import { routes as vendorRoutes } from "./vendor.router";

export const routes = Router();

routes.use("/api/user", userRoutes);
routes.use("/api/vendor", vendorRoutes);
