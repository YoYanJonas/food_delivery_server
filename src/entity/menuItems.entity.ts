import { Menu } from "./menu.entity";
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { MenuItem } from "./menuItem.entity";

@Entity()
export class MenuItems {
  @PrimaryGeneratedColumn()
  mgid: number;

  @ManyToOne(() => Menu, (menu) => menu.menug)
  menu: Menu;

  @OneToMany(() => MenuItem, (items) => items.menug, {
    cascade: true,
  })
  items: MenuItem[];

  @Column()
  name: string;

  @Column()
  image: string;

  get Remaining_Getter(): number {
    return this.items.reduce((a, item) => a + item.Remaining_Getter, 0);
  }
}
