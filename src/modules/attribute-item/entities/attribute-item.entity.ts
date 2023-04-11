import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as mongooseSchema } from 'mongoose';

export type AttributeItemDocument = HydratedDocument<AttributeItem>;

@Schema()
export class AttributeItem {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  nameAscii: string;

  @Prop({ type: Boolean })
  isShowNavFilter: boolean;

  @Prop({ type: Number, required: false })
  levelOrder: number | null;

  @Prop({ type: mongooseSchema.Types.ObjectId, auto: true })
  _id: Types.ObjectId;
}

export const AttributeItemSchema = SchemaFactory.createForClass(AttributeItem);
