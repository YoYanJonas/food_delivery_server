import { RequestHandler } from "express";
import { MyDataSource } from "./../../my-data-source";
import { OrderItem } from "./../../entity/orderItem.entity";
import { Comment } from "../../entity/comment.entity";

//user

export const CommentAdder: RequestHandler = async (req, res) => {
  try {
    const body = req["comment"];
    const itemOrdered = await MyDataSource.getRepository(OrderItem).findOne({
      where: { oiid: body.oiid },
      relations: { ref_menu: true },
    });
    const commented = await MyDataSource.getRepository(Comment).save({
      text: body.text,
      commenter: body.name,
      orderItem: itemOrdered,
      ref_menu: itemOrdered.ref_menu,
    });
    res.send(commented);
  } catch (e) {
    res.send(e);
  }
};

export const CommentRemover: RequestHandler = async (req, res) => {
  try {
    const cid = req.body.cid;
    const { name } = req["comment"];
    await MyDataSource.getRepository(Comment).delete(cid);
    res.send({
      message: `dear ${name}, Your comment on item which you ordered got deleted.`,
    });
  } catch (e) {
    res.send(e);
  }
};

//vendor

export const AddReply: RequestHandler = async (req, res) => {
  try {
    const { reply, cid } = req["reply"];
    await MyDataSource.getRepository(Comment).update({ cid }, { reply: reply });
    res.send({ message: "Your reply have been added to comment." });
  } catch (e) {
    res.send(e);
  }
};

export const RemoveReply: RequestHandler = async (req, res) => {
  try {
    const { cid } = req["reply"];
    await MyDataSource.getRepository(Comment).update({ cid }, { reply: null });
  } catch (e) {
    res.send(e);
  }
};
