import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as mongooseSchema } from 'mongoose';

@Schema()
export class Category {
  @Prop({ type: mongooseSchema.Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  nameAscii: string;

  @Prop({ type: String, required: false })
  imageCateUrl: string;

  @Prop({ type: String, required: false })
  shareImageUrl: string;

  @Prop({ type: mongooseSchema.Types.ObjectId, default: 0 })
  parentID: Types.ObjectId;

  @Prop({ type: Number })
  order: number;

  @Prop({ type: Boolean, default: false })
  isShowInTab: boolean;

  @Prop({ type: Boolean, default: false })
  isShowInNavFilter: boolean;
}

export type CategoryDocument = HydratedDocument<Category>;
export const CategorySchema = SchemaFactory.createForClass(Category);
