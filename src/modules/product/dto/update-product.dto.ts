import { PartialType } from '@nestjs/mapped-types';
import {
  CreateProductDto,
  CreateProductVariantDto,
} from './create-product.dto';
import { AttributeSpecItem } from 'src/modules/attribute-spec-item/entities/attribute-spec-item.entity';
import { Types } from 'mongoose';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  name: string;
  brandName: string;
  nameAscii: string;
  urlPicture: string;
  labelInst: string;
  labelFlashSale: string;
  productVariant?: CreateProductVariantDto;
}
