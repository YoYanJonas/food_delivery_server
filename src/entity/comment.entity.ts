import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderItem } from "./orderItem.entity";
import { MenuItem } from "./menuItem.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  cid: number;

  @OneToOne(() => OrderItem, (item) => item.comment, { onDelete: "CASCADE" })
  orderItem: OrderItem;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.ref_comment, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "ref_menuItem" })
  ref_menu: MenuItem;

  @UpdateDateColumn({ type: "datetime" })
  time: number;

  @Column({ nullable: false })
  text: string;

  @Column({ default: null })
  reply: string;

  @Column({ nullable: false, default: "user" })
  commenter: string;
}
