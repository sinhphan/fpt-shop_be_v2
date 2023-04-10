import { AttributeSpecItemFilterType } from './attribute-spec-item-filter.type';
import { PaginationType } from './pagination.type';
import { ProductFilterType } from './product-filter.type';

export interface QueryParseType {
  pagination: PaginationType;
  productFilters?: ProductFilterType;
  attributeSpecItemsFilters?: AttributeSpecItemFilterType;
  hasAttributeSpecItemsFilters: boolean;
  productSort: {};
}
