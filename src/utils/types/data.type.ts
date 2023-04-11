import { AttributeItem } from 'src/modules/attribute-item/entities/attribute-item.entity';
import { AttributeSpecItem } from 'src/modules/attribute-spec-item/entities/attribute-spec-item.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { PromotionItem } from 'src/modules/promotion-item/entities/promotion-item.entity';
import { SpecItem } from 'src/modules/spec-item/entities/spec-item.entity';

export interface dataType {
  listDefault?: {
    list?: Product[];
  };
  attributeSpecItems?: AttributeSpecItem[];
  promotionItems?: PromotionItem[];
  navFilter?: {
    listCategory?: Category[];
  };
  navFilterAttributeItem?: {
    attributeItems?: AttributeItem[];
    specItems?: SpecItem[];
  };
}
