import { RequestHandler } from "express";
import { MyDataSource } from "../my-data-source";
import { Order } from "./../entity/order.entity";
import { Comment } from "./../entity/comment.entity";

export const purchasedChecker: RequestHandler = async (req, res, next) => {
  try {
    const { oiid, text } = req.body;
    const { uid, name } = req["user"];
    const order = await MyDataSource.getRepository(Order).findOne({
      where: { user: uid },
      relations: { items: true },
    });
    const itemsID = order.items.map((i) => i.oiid);
    if (itemsID.findIndex((i) => i === oiid) === -1) {
      res.send({
        message: `dear ${name}, You can't give a comment on a item which you didn't buy yet.`,
      });
    } else {
      const request = { uid, name, oiid, text };
      req["comment"] = request;

      next();
    }
  } catch (e) {
    res.send(e);
  }
};

export const rightSeller: RequestHandler = async (req, res, next) => {
  try {
    const { cid, reply } = req.body;
    const { vid, name } = req["vendor"];
    const comment = await MyDataSource.getRepository(Comment).findOne({
      where: { cid },
      relations: { orderItem: { order: { vendor: true } } },
    });
    const vendor_of_comment = comment.orderItem.order.vendor.vid;
    if (vendor_of_comment === vid) {
      req["reply"] = { reply, cid };
      next();
    } else {
      res.send({
        message: `Dear ${name}, Your not allowed to give a reply on other sold item.`,
      });
    }
  } catch (e) {
    res.send(e);
  }
};
