import { RequestHandler } from "express";
import { MyDataSource } from "../my-data-source";
import { User } from "../entity/user.entity";
import { verify } from "jsonwebtoken";
import { Vendor } from "../entity/vendor.entity";

export const UserAuthMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const user_jwt = req.cookies["user_jwt"];

    const payload: any = verify(user_jwt, process.env.SECRET_KEY);

    if (!payload) {
      return res
        .status(401)
        .send({ message: "You could not get an authentication." });
    }

    const user = await MyDataSource.getRepository(User).findOne({
      where: { uid: payload.id },
      select: {
        uid: true,
        name: true,
        password: true,
        city: true,
        location: true,
        points: true,
        email: true,
        phone: true,
      },
    });
    req["user"] = user;

    next();
  } catch (e) {
    return res
      .status(401)
      .send({ message: "You could not get an authentication." });
  }
};

export const VendorAuthMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const vendor_jwt = req.cookies["vendor_jwt"];

    const payload: any = verify(vendor_jwt, process.env.SECRET_KEY);

    if (!payload) {
      return res
        .status(401)
        .send({ message: "You could not get an authentication." });
    }

    const vendor = await MyDataSource.getRepository(Vendor).findOne({
      where: { vid: payload.id },
      select: {
        vid: true,
        name: true,
        password: true,
        city: true,
        location: true,
        ranking: true,
        email: true,
        phone: true,
        image: true,
      },
    });
    req["vendor"] = vendor;

    next();
  } catch (e) {
    return res
      .status(401)
      .send({ message: "You could not get an authentication." });
  }
};
