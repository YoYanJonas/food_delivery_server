import { MyDataSource } from "../../my-data-source";
import { RequestHandler } from "express";
import { Menu } from "../../entity/menu.entity";
import { MenuItems } from "./../../entity/menuItems.entity";
import { MenuItem } from "./../../entity/menuItem.entity";

export const RenameMenu: RequestHandler = async (req, res) => {
  try {
    await MyDataSource.getRepository(Menu).update(
      { mid: req.body.mid },
      { name: req.body.name }
    );
    res.send({ message: `Your Menu renamed to ${req.body.name}` });
  } catch (e) {
    res.send(e);
  }
};

export const MenuG: RequestHandler = async (req, res) => {
  try {
    const vendor = req["vendor"];
    const menu = await MyDataSource.getRepository(Menu).findOne({
      where: { mid: vendor.menu.mid },
      relations: { menug: true },
    });

    res.send(menu);
  } catch (e) {
    res.send(e);
  }
};

export const GetMenuGItems: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    const menuG = await MyDataSource.getRepository(MenuItems).findOne({
      where: { mgid: body.mgid },
      relations: { items: true },
    });
    res.send(menuG);
  } catch (e) {
    res.send(e);
  }
};

//MenuG

export const AddMenuG: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    const vendor = req["vendor"];
    const menu: Menu = { ...vendor.menu, vendor };

    const menuG = await MyDataSource.getRepository(MenuItems).save({
      ...body,
      menu: menu,
    });
    res.send(menuG);
  } catch (e) {
    res.send(e);
  }
};

export const RemoveMenuG: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    const menuG = await MyDataSource.getRepository(MenuItems).findOne({
      where: { mgid: body.mgid },
      relations: { items: true },
    });
    const removedG = await MyDataSource.getRepository(MenuItems).remove(menuG);
    res.send(removedG);
  } catch (e) {
    res.send(e);
  }
};

export const UpdateMenuG: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    await MyDataSource.getRepository(MenuItems).update(
      { mgid: body.mgid },
      {
        ...body,
      }
    );
    const updatedMenuG = await MyDataSource.getRepository(MenuItems).findOne({
      where: { mgid: body.mgid },
    });
    res.send(updatedMenuG);
  } catch (e) {
    res.send(e);
  }
};

//Item

export const ItemAdder: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    const menuG = await MyDataSource.getRepository(MenuItems).findOne({
      where: { mgid: body.mgid },
    });
    delete body.mgid;
    const item = await MyDataSource.getRepository(MenuItem).save({
      ...body,
      menug: menuG,
    });
    res.send(item);
  } catch (e) {
    res.send(e);
  }
};

export const ItemRemover: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    await MyDataSource.getRepository(MenuItem).delete(body.iid);
    res.send({ message: "Your item deleted succesfully" });
  } catch (e) {
    res.send(e);
  }
};

export const ItemUpdator: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    await MyDataSource.getRepository(MenuItem).update(
      { iid: body.iid },
      { ...body }
    );
    const updatedItem = await MyDataSource.getRepository(MenuItem).findOne({
      where: { iid: body.iid },
    });
    res.send(updatedItem);
  } catch (e) {
    res.send(e);
  }
};
