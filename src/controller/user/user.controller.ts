import { Vendor } from "../../entity/vendor.entity";
import { RequestHandler } from "express";
import { MyDataSource } from "../../my-data-source";

export const Vendors: RequestHandler = async (req, res) => {
  const vednors = await MyDataSource.getRepository(Vendor).find({
    relations: { menu: true },
  });

  res.status(200).send(vednors);
};
