import {
  AuthenticatedUser,
  LoginUser,
  LogoutUser,
  reigsterUser,
  UpdataLocation,
  UpdateUserInfo,
  UserUpdatePassword,
} from "./../controller/user/auth.controller";
import { Router } from "express";
import { UserAuthMiddleware } from "../middlewares/auth.middleware";
import {
  CancelOrder,
  OrderCreator,
  VendorListGetter,
} from "../controller/user/user.controller";
import { purchasedChecker } from "../middlewares/purchased.middleware";
import {
  CommentAdder,
  CommentRemover,
} from "../controller/user/comment.controller";

export const routes = Router();

routes.post("/register", reigsterUser);
routes.post("/login", LoginUser);
routes.get("/", UserAuthMiddleware, AuthenticatedUser);
routes.post("/logout", UserAuthMiddleware, LogoutUser);
routes.patch("/updateinfo", UserAuthMiddleware, UpdateUserInfo);
routes.patch("/password", UserAuthMiddleware, UserUpdatePassword);
routes.patch("/location", UserAuthMiddleware, UpdataLocation);

// other entities
routes.get("/VendorList", VendorListGetter);

// Order part
routes.post("/orderCreating", UserAuthMiddleware, OrderCreator);
routes.post("/orderCanceling", UserAuthMiddleware, CancelOrder);

//comment
routes.post(
  "/order/comment",
  UserAuthMiddleware,
  purchasedChecker,
  CommentAdder
);
routes.delete(
  "/order/comment",
  UserAuthMiddleware,
  purchasedChecker,
  CommentRemover
);
