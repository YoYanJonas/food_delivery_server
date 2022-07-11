import { Order } from "./order.entity";
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Menu } from "./menu.entity";

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  vid: number;

  @OneToOne(() => Menu, (menu) => menu.vendor)
  @JoinColumn()
  menu: Menu;

  @OneToMany(() => Order, (order) => order.vendor)
  orders: Order[];

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @Column({ type: "bigint" })
  phone: number;

  @Column()
  city: string;

  @Column()
  location: string;

  @Column({ unique: true, nullable: true })
  ranking: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  joinedAt: string;
}
