import { MyDataSource } from "./../../my-data-source";
import { RequestHandler } from "express";
import { User } from "./../../entity/user.entity";
import { Order } from "./../../entity/order.entity";
import { OrderItem } from "../../entity/orderItem.entity";
import { Vendor } from "../../entity/vendor.entity";
import { MenuItem } from "./../../entity/menuItem.entity";
import { OrderStatus } from "../../entity/orderStatus.entity";
//
import { orderstatus, orderstatusID } from "../../entity/orderStatus.entity";

//
export const VendorListGetter: RequestHandler = async (req, res) => {
  try {
    const vendors = await MyDataSource.getRepository(Vendor).find({
      relations: { menu: true },
    });

    res.status(200).send(vendors);
  } catch (e) {
    res.send(e);
  }
};

export const OrderCreator: RequestHandler = async (req, res) => {
  const queryRunner = MyDataSource.createQueryRunner();
  try {
    const body = req.body;
    const user = req["user"];
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const items: OrderItem[] = [];
    const tc = body.items.length;
    for (let i = 0; i < tc; i++) {
      const menu_item = await queryRunner.manager.findOne(MenuItem, {
        where: { iid: body.items[i] },
      });
      if (menu_item.remainingItem === 0) {
        throw new Error(`we don't have ${menu_item.name} in our menu.`);
      }

      const order_item = new OrderItem();
      order_item.price = menu_item.price;
      order_item.ref_menu = menu_item;

      const resultItem = await queryRunner.manager.save(order_item);

      items.push(resultItem);
      await queryRunner.manager.update(
        MenuItem,
        { iid: body.items[i] },
        { remainingItem: menu_item.remainingItem - 1 }
      );
    }
    const order = new Order();
    order.user = user.uid;
    order.vendor = body.vid;
    order.note = "well-done please";
    order.items = items;
    order.price = items.reduce((a, i) => a + i.Price, 0);

    const resultOrder = await queryRunner.manager.save(order);

    await queryRunner.manager.update(
      User,
      { uid: user.uid },
      { points: user.Point_getter + resultOrder.price * 0.005 }
    );
    const vendor = await queryRunner.manager.findOne(Vendor, {
      where: { vid: body.vid },
    });

    await queryRunner.manager.update(
      Vendor,
      { vid: vendor.vid },
      { revenue: +resultOrder.price + +vendor.Revenue_Getter }
    );
    await queryRunner.commitTransaction();

    res.send(resultOrder);
  } catch (e) {
    res.send(e.message);
    await queryRunner.rollbackTransaction();
  }
};

export const CancelOrder: RequestHandler = async (req, res) => {
  const queryRunner = MyDataSource.createQueryRunner();

  try {
    const body = req.body;
    const user = req["user"];
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const order = await queryRunner.manager.findOne(Order, {
      where: { oid: body.oid },
      relations: { status: true, vendor: true, items: { ref_menu: true } },
    });
    console.log(order);
    if (order.status.name !== "canceled") {
      const order_items: OrderItem[] = order.items;

      const menuItems = order_items.map((item) => item.ref_menu);
      const tc = menuItems.length;
      for (let i = 0; i < tc; i++) {
        await queryRunner.manager.update(
          MenuItem,
          { iid: menuItems[i].iid },
          { remainingItem: menuItems[i].Remaining_Getter + 1 }
        );
      }

      await queryRunner.manager.update(
        User,
        { uid: user.uid },
        { points: user.Point_getter - order.price * 0.005 }
      );
      const vendor = await queryRunner.manager.findOne(Vendor, {
        where: { vid: order.vendor.vid },
      });
      console.log(vendor);
      await queryRunner.manager.update(
        Vendor,
        { vid: order.vendor.vid },
        { revenue: +vendor.Revenue_Getter - +order.price }
      );

      const cancelStatus = new OrderStatus();
      cancelStatus.name = orderstatus.CANCELED;
      cancelStatus.osid = orderstatusID.CANCELED;
      await queryRunner.manager.update(
        Order,
        { oid: order.oid },
        { status: cancelStatus }
      );

      await queryRunner.commitTransaction();
      res.send(`Your order from ${vendor.name} got canceled.`);
    }

    res.send(
      `Your order is on ${order.status.name} stage. You can't cancel a canceled order`
    );
  } catch (e) {
    res.send(e);
    await queryRunner.rollbackTransaction();
  }
};
