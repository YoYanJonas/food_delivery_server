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

  @Column({ nullable: false })
  name: string;

  @Column({ select: false })
  password: string;

  @Column()
  city: string;

  @Column({ type: "float" })
  latitude: number;

  @Column({ type: "float" })
  longitude: number;

  @Column({ nullable: true })
  points: number;

  get Point_getter(): number {
    return this.points;
  }

  @Column({ unique: true })
  email: string;

  @Column({ type: "bigint", nullable: false, unique: true })
  phone: number;

  @CreateDateColumn({ type: "datetime" })
  joinedAt: number;
}
