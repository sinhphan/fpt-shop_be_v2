import { StringFilterType } from './string-filter.type';

export interface AttributeSpecItemFilterType {
  $and?: [
    {
      $and?: {
        specName?: StringFilterType;
      }[];
    },
    { $and?: { productID: string }[] | {}[] },
  ];
}
