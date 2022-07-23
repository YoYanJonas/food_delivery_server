import { Router } from "express";
import { AddReply, RemoveReply } from "../controller/user/comment.controller";
import {
  AuthenticatedVendor,
  LoginVendor,
  LogoutVendor,
  reigsterVendor,
  UpdateVendorInfo,
  VendorUpdatePassword,
} from "../controller/vendor/auth.controller";

import {
  AddMenuG,
  GetMenuGItems,
  ItemAdder,
  ItemRemover,
  ItemUpdator,
  MenuG,
  RemoveMenuG,
  RenameMenu,
  UpdateMenuG,
} from "../controller/vendor/vendor.controller";

import { VendorAuthMiddleware } from "../middlewares/auth.middleware";
import { rightSeller } from "../middlewares/purchased.middleware";

export const routes = Router();

routes.post("/register", reigsterVendor);
routes.post("/login", LoginVendor);
routes.get("/", VendorAuthMiddleware, AuthenticatedVendor);
routes.post("/logout", VendorAuthMiddleware, LogoutVendor);
routes.patch("/updateinfo", VendorAuthMiddleware, UpdateVendorInfo);
routes.patch("/password", VendorAuthMiddleware, VendorUpdatePassword);

// Menu

routes.get("/menu", VendorAuthMiddleware, MenuG);
routes.patch("/menu/rename", VendorAuthMiddleware, RenameMenu);
routes.get("/menu/items", VendorAuthMiddleware, GetMenuGItems);
routes.post("/menu/addMenuG", VendorAuthMiddleware, AddMenuG);
routes.delete("/menu/removeMenuG", VendorAuthMiddleware, RemoveMenuG);
routes.patch("/menu/UpdateMenuG", VendorAuthMiddleware, UpdateMenuG);
routes.post("/menu/addItem", VendorAuthMiddleware, ItemAdder);
routes.delete("/menu/removeItem", VendorAuthMiddleware, ItemRemover);
routes.patch("/menu/UpdateItem", VendorAuthMiddleware, ItemUpdator);

//comment and reply

routes.post("/item/reply", VendorAuthMiddleware, rightSeller, AddReply);
routes.patch("/item/reply", VendorAuthMiddleware, rightSeller, RemoveReply);
