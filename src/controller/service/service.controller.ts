import { RequestHandler } from "express";
import { Between } from "typeorm";
import { Vendor } from "../../entity/vendor.entity";
import { Menu } from "../../entity/menu.entity";
import { MyDataSource } from "../../my-data-source";
import { MenuItems } from "../../entity/menuItems.entity";
import { RedisClient } from "../..";

export const SetLocation: RequestHandler = async (req, res) => {
  try {
    const body = req.body;

    if (body.latitude && body.longitude) {
      const vendors = await MyDataSource.getRepository(Vendor).find({
        where: {
          longitude: Between(body.longitude - 0.01, body.longitude + 0.01),
          latitude: Between(body.latitude - 0.01, body.latitude + 0.01),
        },
        relations: { menu: true },
      });
      const loc = JSON.stringify({
        uid: "",
        latitude: body.latitude,
        longitude: body.longitude,
      });
      res.cookie("location", loc, {
        encode: String,
        httpOnly: true,
        expires: new Date(Date.now() + 94694152000),
      });
      res.send(vendors);
    }
  } catch (e) {
    res.send(e);
  }
};

export const VendorsList: RequestHandler = async (req, res) => {
  try {
    let vendors: Vendor[] = JSON.parse(await RedisClient.get("vendors"));

    if (!vendors) {
      vendors = await MyDataSource.getRepository(Vendor).find({
        relations: { menu: { menug: true } },
      });

      await RedisClient.set("Vendors", JSON.stringify(vendors), { EX: 3600 });
    }
    res.status(200).send(vendors);
  } catch (e) {
    res.send(e);
  }
};

export const Menulist: RequestHandler = async (req, res) => {
  try {
    const vid = +req.params.vid;
    const VendorRepository = MyDataSource.getRepository(Vendor);
    const vendor = await VendorRepository.find({
      where: { vid },
      relations: { menu: { menug: true } },
    });
    if (vendor[0]) {
      res.send(vendor);
    } else {
      res.send({ message: "we don't have such a place dear." });
    }
  } catch (e) {
    res.send(e);
  }
};

export const menuGfetch: RequestHandler = async (req, res) => {
  try {
    const mid = +req.params.mid;
    const MenuRepository = MyDataSource.getRepository(Menu);
    const menu = await MenuRepository.find({
      where: { mid },
      relations: { menug: true },
    });

    if (menu[0]) {
      res.send(menu);
    } else {
      res.send({ message: "No menu for now. sorry." });
    }
  } catch (e) {
    res.send(e);
  }
};

export const fetchItemsFood: RequestHandler = async (req, res) => {
  try {
    const mgid = +req.params.mgid;
    const menuGRepository = MyDataSource.getRepository(MenuItems);
    const menuG = await menuGRepository.find({
      where: { mgid },
      relations: { items: true },
    });

    if (menuG[0]) {
      res.send(menuG);
    } else {
      res.send({ message: "No food for now. sorry." });
    }
  } catch (e) {
    res.send(e);
  }
};
