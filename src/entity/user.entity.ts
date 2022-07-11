import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Column()
  name: string;

  @Column({ select: false })
  password: string;

  @Column()
  city: string;

  @Column()
  location: string;

  @Column()
  points: number;

  @Column({ unique: true })
  email: string;

  @Column({ type: "bigint" })
  phone: number;

  @CreateDateColumn({ type: "timestamp" })
  joinedAt: number;
}
