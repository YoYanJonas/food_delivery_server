import { Vendor } from "./vendor.entity";
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
  OneToMany,
} from "typeorm";
import { MenuItems } from "./menuItems.entity";

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  mid: number;

  @OneToOne(() => Vendor, (vendor) => vendor.menu)
  vendor: Vendor;

  @OneToMany(() => MenuItems, (menug) => menug.menu)
  menug: MenuItems[];

  @Column()
  name: string;
}
