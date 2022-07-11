import {
  AuthenticatedUser,
  LoginUser,
  LogoutUser,
  reigsterUser,
  UpdateUserInfo,
  UserUpdatePassword,
} from "./../controller/user/auth.controller";
import { Router } from "express";
import { UserAuthMiddleware } from "../middlewares/auth.middleware";
import { Vendors } from "../controller/user/user.controller";

export const routes = Router();

routes.post("/register", reigsterUser);
routes.post("/login", LoginUser);
routes.get("/", UserAuthMiddleware, AuthenticatedUser);
routes.post("/logout", UserAuthMiddleware, LogoutUser);
routes.patch("/updateinfo", UserAuthMiddleware, UpdateUserInfo);
routes.patch("/password", UserAuthMiddleware, UserUpdatePassword);

// with other entities
routes.get("/vendors", Vendors);
