import { RequestHandler } from "express";
import { MyDataSource } from "../../my-data-source";
import { Vendor } from "./../../entity/vendor.entity";
import bcryptjs from "bcryptjs";
import { sign } from "jsonwebtoken";

export const reigsterVendor: RequestHandler = async (req, res) => {
  try {
    if (req) {
      const body = req.body;

      if (body.password !== body.password_confirm) {
        return res.status(400).send({
          message: "passwords do not match",
        });
      }
      delete body.password_confirm;

      if (body.name && body.phone && body.longitude && body.latitude) {
        const vendor = await MyDataSource.getRepository(Vendor).save({
          ...body,
          password: await bcryptjs.hash(body.password, 10),
        });
        delete vendor.password;

        res.send(vendor);
      }
    }
  } catch (e) {
    res.send(e);
  }
};

//Login

export const LoginVendor: RequestHandler = async (req, res) => {
  if (req.body.email && req.body.password) {
    const vendor = await MyDataSource.getRepository(Vendor).findOne({
      select: { vid: true, password: true },
      where: {
        email: req.body.email,
      },
    });

    if (!vendor) {
      return res.status(400).send({ message: "invalid credentials." });
    }

    if (!(await bcryptjs.compare(req.body.password, vendor.password))) {
      return res
        .status(400)
        .send({ message: "password is incorrect. check plz." });
    }

    const token = sign(
      {
        id: vendor.vid,
      },
      process.env.SECRET_KEY
    );

    res.cookie("vendor_jwt", token, {
      httpOnly: true,
      maxAge: 604800000, //7days
    });

    res.send({
      message: "Vendor logged in. you have the token now for 7 days.",
    });
  } else {
    res.send({ message: "please enter your credentials." });
  }
};

//
export const AuthenticatedVendor: RequestHandler = async (req, res) => {
  const { password, ...vendor } = req["vendor"];

  res.send(vendor);
};

//logout

export const LogoutVendor: RequestHandler = async (req, res) => {
  res.cookie("vendor_jwt", "", { maxAge: 0 });

  res.send({ message: "vendor logged out succesfully." });
};

export const UpdateVendorInfo: RequestHandler = async (req, res) => {
  const vendor = req["vendor"];
  await MyDataSource.getRepository(Vendor).update(vendor.vid, {
    name: req.body.name,
    phone: req.body.phone,
    city: req.body.city,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    email: req.body.email,
    image: req.body.image,
  });
  const updatedVendor = await MyDataSource.getRepository(Vendor).find({
    where: { vid: vendor.vid },
  });

  res.send(updatedVendor);
};

export const VendorUpdatePassword: RequestHandler = async (req, res) => {
  const vendor = req["vendor"];

  if (req.body.password !== req.body.password_confirm) {
    return res.status(400).send({
      message: "passwords do not match",
    });
  }
  if (await bcryptjs.compare(req.body.password, vendor.password)) {
    return res.send({
      message:
        "please enter new password. entered password is the same before.",
    });
  }

  await MyDataSource.getRepository(Vendor).update(vendor.vid, {
    password: await bcryptjs.hash(req.body.password, 10),
  });

  res.status(200).send({ message: "password changed successfully." });
};
