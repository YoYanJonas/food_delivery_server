import { Vendor } from "./vendor.entity";
import { OrderItem } from "./orderItem.entity";
import { OrderStatus } from "./orderStatus.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  oid: number;

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  user: User;

  @ManyToOne(() => OrderStatus, (status) => status.orders, { nullable: false })
  status: OrderStatus;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @ManyToOne(() => Vendor, (vendor) => vendor.orders, { nullable: false })
  vendor: Vendor;

  @CreateDateColumn({ type: "datetime" })
  creationTime: number;

  @Column({ type: "datetime", nullable: true })
  orderedTime: number;

  @Column({ type: "datetime", nullable: true })
  preparedTime: number;

  @Column({ type: "datetime", nullable: true })
  takenOverTime: number;

  @Column({ default: 0 })
  isPaid: boolean;

  @Column({ default: 0 })
  price: number;

  @Column({ nullable: true })
  note: string;
}
