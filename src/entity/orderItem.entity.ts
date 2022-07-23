import { Order } from "./order.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MenuItem } from "./menuItem.entity";
import { Comment } from "./comment.entity";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  oiid: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @OneToOne(() => MenuItem, { createForeignKeyConstraints: false })
  @JoinColumn({ name: "ref_iid" })
  ref_menu: MenuItem;

  @OneToOne(() => Comment, (comment) => comment.orderItem, {
    cascade: ["remove"],
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "ref_commentId" })
  comment: Comment;

  @Column()
  price: number;

  get Price(): number {
    return this.price;
  }
}
