import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from "typeorm";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userTag: string

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  createDate: Date;

  @Column()
  lastOriginTime: Date;

  @Column()
  userAvatar: String;
}