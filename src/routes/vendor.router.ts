import { Router } from "express";
import { Vendors } from "../controller/user/user.controller";
import {
  AuthenticatedVendor,
  LoginVendor,
  LogoutVendor,
  reigsterVendor,
  UpdateVendorInfo,
  VendorUpdatePassword,
} from "../controller/vendor/auth.controller";

import { Menu } from "../controller/vendor/vendor.controller";

import { VendorAuthMiddleware } from "../middlewares/auth.middleware";

export const routes = Router();

routes.get("/list", Vendors);
routes.post("/register", reigsterVendor);
routes.post("/login", LoginVendor);
routes.get("/", VendorAuthMiddleware, AuthenticatedVendor);
routes.post("/logout", VendorAuthMiddleware, LogoutVendor);
routes.patch("/updateinfo", VendorAuthMiddleware, UpdateVendorInfo);
routes.patch("/password", VendorAuthMiddleware, VendorUpdatePassword);

// Menu

routes.get("/menu", VendorAuthMiddleware, Menu);
