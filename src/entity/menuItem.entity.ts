import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MenuItems } from "./menuItems.entity";
import { OrderItem } from "./orderItem.entity";
import { Comment } from "./comment.entity";

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn()
  iid: number;

  @ManyToOne(() => MenuItems, (menug) => menug.items, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  menug: MenuItems;

  @OneToOne(() => OrderItem, (order_item) => order_item.ref_menu, {
    createForeignKeyConstraints: false,
  })
  ref_order: OrderItem;

  @OneToMany(() => Comment, (comment) => comment.ref_menu, {
    eager: true,
    cascade: ["remove"],
  })
  ref_comment: Comment[];

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

  get Remaining_Getter(): number {
    return this.remainingItem;
  }
}
