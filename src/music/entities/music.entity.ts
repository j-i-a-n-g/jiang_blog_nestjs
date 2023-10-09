import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'music' })
export class MusicEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  m_tag: string;

  @Column()
  m_name: string;

  @Column()
  m_url: string;

  @Column()
  m_author: string;

  @Column()
  m_language: string;

  @Column()
  m_coverImg_url: string;

  @Column()
  m_desc: string;

  @Column()
  m_lyrics: string;

  @CreateDateColumn(
    {
      type: 'timestamp',
      comment: "创建时间",
      name: 'creatTime'
    }
  )
  createTime: Date;

  // @ManyToMany(() => M_TagService)
  // m_tags: Array<M_TagService>
}
