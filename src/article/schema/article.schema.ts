import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article extends Document {
  @Prop({ required: true })
  articleid: string

  @Prop({ required: true })
  articleTitle: string;

  @Prop({ required: true })
  articleImgUrl: string | null

  @Prop()
  articleDate: Date

  @Prop({ required: true })
  articleDesc: string;

  @Prop({ required: true })
  articleFileUrl: string;

  @Prop()
  articleHot: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);