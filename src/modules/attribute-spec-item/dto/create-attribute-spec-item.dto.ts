import { Product } from 'src/modules/product/entities/product.entity';

export class CreateAttributeSpecItemDto {
  attributeID: number;
  attributeName: string;
  specName: string;
  cssClass: string;
  productID: Product;
}
