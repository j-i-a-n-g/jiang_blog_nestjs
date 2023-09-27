import { ArticleEntity } from "src/article/entities/article.entity";
import { 
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany
 } from "typeorm";

@Entity()
export class Article_Tag {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  tagName: string;

  @CreateDateColumn(
    {
      type: 'timestamp',
      comment: "创建时间",
      name: 'creatTime'
    }
  )
  createTime: Date;

  @UpdateDateColumn(
    {
      type: 'timestamp',
      comment: "创建时间",
      name: 'updateTime'
    }
  )
  updateTime: Date;

  @ManyToMany(() => ArticleEntity)
  post: Array<ArticleEntity>
}