import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { AttributeItem } from 'src/modules/attribute-item/entities/attribute-item.entity';

@Schema()
export class SpecItem {
  @Prop({ type: Number })
  attrCusGroupLevelOrder: number;

  @Prop({ type: Number })
  displayOrder: number;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  nameAscii: string;

  @Prop({ type: String })
  attrCusGroupName: string;

  @Prop({ type: String })
  attrCusGroupNameAscii: string;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: AttributeItem.name })
  attributeID: AttributeItem;
}

export type SpecItemDocument = HydratedDocument<SpecItem>;
export const SpecItemSchema = SchemaFactory.createForClass(SpecItem);
