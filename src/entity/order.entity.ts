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

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => OrderStatus, (status) => status.orders)
  status: OrderStatus;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @ManyToOne(() => Vendor, (vendor) => vendor.orders)
  vendor: Vendor;

  @CreateDateColumn()
  creationTime: number;

  @Column()
  orderedTime: number;

  @Column()
  preparedTime: number;

  @Column()
  takenOverTime: number;

  @Column()
  isPaid: boolean;

  @Column()
  price: number;

  @Column({ nullable: true })
  note: string;
}
