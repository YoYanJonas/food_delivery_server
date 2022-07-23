import { Router } from "express";
import {
  fetchItemsFood,
  menuGfetch,
  Menulist,
  SetLocation,
  VendorsList,
} from "../controller/service/service.controller";

export const routes = Router();

//

routes.get("/location", SetLocation);
routes.get("/vendors", VendorsList);
routes.get("/vendor/:vid", Menulist);
routes.get("/vendor/:vid/:mid", menuGfetch);
routes.get("/vendor/:vid/:mid/:mgid", fetchItemsFood);
