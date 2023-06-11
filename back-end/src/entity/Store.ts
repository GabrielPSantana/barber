import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
@Entity()
export class Store {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  description: string;

  @Column("varchar")
  category: string;

  @Column("varchar")
  contact: string;

  @Column("double precision")
  latitude: number;

  @Column("double precision")
  longitude: number;

  @ManyToOne(() => User, (user) => user.stores)
  user: User;
}
