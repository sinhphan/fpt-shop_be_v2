import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from 'src/modules/product/entities/product.entity';

export type AttributeSpecItemDocument = AttributeSpecItem & mongoose.Document;

@Schema()
export class AttributeSpecItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  productID: Product;

  @Prop({ type: Number, required: true, index: -1 })
  attributeID: number;

  @Prop({ type: String, required: true })
  attributeName: string;

  @Prop({ type: String, required: true })
  specName: string;

  @Prop({ type: String, required: true })
  cssClass: string;
}

export const AttributeSpecItemSchema =
  SchemaFactory.createForClass(AttributeSpecItem);
