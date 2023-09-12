import { Article_Tag } from "src/article_tag/entities/article_tag.entity";
import { 
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany
 } from "typeorm";


@Entity()
export class article {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @CreateDateColumn(
    {
      type: 'timestamp',
      comment: '创建时间',
      name:'createTime'
    }
  )
  createTime: Date;

  @UpdateDateColumn(
    {
      type: 'timestamp',
      comment: '更新时间',
      name: 'updateTime'
    }
  )
  updateTime: Date;

  @Column()
  articleImgUrl: string;

  @Column()
  articleFileUrl: string;

  @ManyToMany(() =>Article_Tag, (post) => post.tag)
  posts: Array<Article_Tag>
}