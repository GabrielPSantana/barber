import { Column, PrimaryGeneratedColumn, OneToMany, Entity } from "typeorm";
import { Store } from "./Store";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  password: string;

  @OneToMany(() => Store, (store) => store.user,{eager: true})
  stores: Store[];
}
