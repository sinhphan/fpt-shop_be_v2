import { Product } from 'src/modules/product/entities/product.entity';

export class CreatePromotionItemDto {
  sku: string;
  promotionName: string;
  urlPicture: string;
  displayOrder: number;
  id: number;
  productID: Product;
}
