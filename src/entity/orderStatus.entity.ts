import { Order } from "./order.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

export enum orderstatus {
  NOTCOMMITED = "not_commited",
  WAITING = "waiting",
  SUPPLYING = "supplying",
  COURIER = "courier",
  SENT = "sent",
  DELIVERED = "deliverd",
  CANCELED = "canceled",
}

export enum orderstatusID {
  NOTCOMMITED = 1,
  WAITING = 2,
  SUPPLYING = 3,
  COURIER = 4,
  SENT = 5,
  DELIVERED = 6,
  CANCELED = 7,
}

@Entity()
export class OrderStatus {
  @PrimaryColumn({
    type: "enum",
    enum: orderstatusID,
    default: orderstatusID.NOTCOMMITED,
  })
  osid: orderstatusID;

  @Column({
    type: "enum",
    enum: orderstatus,
    default: orderstatus.NOTCOMMITED,
    unique: true,
  })
  name: orderstatus;

  @OneToMany(() => Order, (orders) => orders.status)
  orders: Order[];
}
