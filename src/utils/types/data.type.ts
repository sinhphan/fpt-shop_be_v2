import { AttributeSpecItem } from 'src/modules/attribute-spec-item/entities/attribute-spec-item.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { PromotionItem } from 'src/modules/promotion-item/entities/promotion-item.entity';

export interface dataType {
  listDefault?: {
    list: Product[];
  };
  attributeSpecItems?: AttributeSpecItem[];
  promotionItems?: PromotionItem[];
}
