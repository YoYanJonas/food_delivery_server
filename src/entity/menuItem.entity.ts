import { OrderItem } from "./orderItem.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MenuItems } from "./menuItems.entity";

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn()
  iid: number;

  @ManyToOne(() => MenuItems, (menug) => menug.items)
  menug: MenuItems;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  image: string;

  @Column()
  remainingItem: number;
}
