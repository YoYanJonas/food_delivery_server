import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  city: string;

  @Column()
  location: string;

  @Column()
  points: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: number;
}
