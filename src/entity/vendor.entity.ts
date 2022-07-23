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
import { Order } from "./order.entity";

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

  @Column({ nullable: false })
  name: string;

  @Column({ type: "bigint", nullable: false, unique: true })
  phone: number;

  @Column()
  city: string;

  @Column({ type: "float", nullable: false })
  latitude: number;

  @Column({ type: "float", nullable: false })
  longitude: number;

  @Column({ type: "bigint", unique: true, nullable: true, default: 0 })
  revenue: number;

  get Revenue_Getter(): number {
    return this.revenue;
  }

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  joinedAt: string;
}
