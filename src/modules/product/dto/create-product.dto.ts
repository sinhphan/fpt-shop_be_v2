import { Types } from 'mongoose';
import { AttributeSpecItem } from 'src/modules/attribute-spec-item/entities/attribute-spec-item.entity';

export class CreateProductDto {
  name: string;
  brandName: string;
  nameAscii: string;
  urlPicture: string;
  labelInst: string;
  labelFlashSale: string;
  productVariant: CreateProductVariantDto;
}

export class CreateProductVariantDto {
  sku: string;
  stockQuantity: number;
  price: number;
  priceMarket: number;
}
