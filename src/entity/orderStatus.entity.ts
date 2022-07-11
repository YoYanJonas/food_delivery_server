import { Order } from "./order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderStatus {
  @PrimaryGeneratedColumn()
  osid: number;

  @Column()
  name: string;

  @OneToMany(() => Order, (orders) => orders.status)
  orders: Order[];
}
