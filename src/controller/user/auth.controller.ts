import { RequestHandler } from "express";
import { Repository } from "typeorm";
import { User } from "../../entity/user.entity";
import { MyDataSource } from "../../my-data-source";
import bcryptjs from "bcryptjs";
import { sign } from "jsonwebtoken";

export const reigsterUser: RequestHandler = async (req, res) => {
  try {
    if (req) {
      const body = req.body;

      if (body.password !== body.password_confirm) {
        return res.status(400).send({
          message: "passwords do not match",
        });
      }
      if (body.name && body.phone) {
        const user = await MyDataSource.getRepository(User).save({
          name: body.name,
          password: await bcryptjs.hash(body.password, 10),
          city: body.city,
          latitude: body.latitude,
          longitude: body.longitude,
          points: body.points,
          email: body.email,
          phone: body.phone,
        });
        delete user.password;

        res.send(user);
      }
    }
  } catch (e) {
    res.send(e);
  }
};

export const LoginUser: RequestHandler = async (req, res) => {
  if (req.body.email && req.body.password) {
    const user = await MyDataSource.getRepository(User).findOne({
      select: { uid: true, password: true },
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(400).send({ message: "invalid credentials." });
    }

    if (!(await bcryptjs.compare(req.body.password, user.password))) {
      return res
        .status(400)
        .send({ message: "password is incorrect. check plz." });
    }

    const token = sign(
      {
        id: user.uid,
      },
      process.env.SECRET_KEY
    );

    res.cookie("user_jwt", token, {
      httpOnly: true,
      maxAge: 604800000, //7days
    });

    res.send({
      message: "logged in. you have the token now for 7 days.",
    });
  } else {
    res.send({ message: "please enter your credentials" });
  }
};

export const AuthenticatedUser: RequestHandler = async (req, res) => {
  const { password, ...user } = req["user"];

  res.send(user);
};

export const LogoutUser: RequestHandler = async (req, res) => {
  res.cookie("user_jwt", "", { maxAge: 0 });

  res.send({ message: "logged out succesfully." });
};

export const UpdateUserInfo: RequestHandler = async (req, res) => {
  const user = req["user"];
  await MyDataSource.getRepository(User).update(user.uid, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });

  const updatedUser = await MyDataSource.getRepository(User).findOne({
    where: { uid: user.uid },
  });

  res.send(updatedUser);
};

export const UserUpdatePassword: RequestHandler = async (req, res) => {
  const user = req["user"];

  if (req.body.password !== req.body.password_confirm) {
    return res.status(400).send({
      message: "passwords do not match",
    });
  }
  if (await bcryptjs.compare(req.body.password, user.password)) {
    return res.send({
      message:
        "please enter new password. entered password is the same before.",
    });
  }

  await MyDataSource.getRepository(User).update(user.uid, {
    password: await bcryptjs.hash(req.body.password, 10),
  });

  res.status(200).send({ message: "password changed successfully." });
};

export const UpdataLocation: RequestHandler = async (req, res) => {
  const user = req["user"];

  await MyDataSource.getRepository(User).update(user.uid, {
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    city: req.body.city,
  });

  const updatedUser = await MyDataSource.getRepository(User).findOne({
    where: { uid: user.uid },
  });

  res.send(updatedUser);
};
