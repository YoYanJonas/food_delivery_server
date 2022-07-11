import { MenuItem } from "./menuItem.entity";
import { Order } from "./order.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  oiid: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
