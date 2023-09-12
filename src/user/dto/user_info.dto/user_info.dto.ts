import { Column, PrimaryGeneratedColumn } from "typeorm";

export class UserInfoDto {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false })
  username: string;

  @Column({ length: 100, nullable: false })
  password: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDate: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastOriginTime: Date;

  @Column({ length: 100, nullable: true, default: null })
  userAvatar: string;
}
