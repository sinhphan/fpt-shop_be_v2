import { StringFilterType } from './string-filter.type';

export interface AttributeSpecItemFilterType {
  $or?: { specName: StringFilterType }[];
}
