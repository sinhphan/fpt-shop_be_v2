import { StringFilterType } from './string-filter.type';

export interface ProductFilterType {
  $and?:
    | [
        {
          brandName?: StringFilterType | {};
        },
        {
          $or?: PriceFilterType[] | {}[];
        },
      ]
    | [{}];
}

export interface PriceFilterType {
  $and: [
    { 'productVariant.price': { $gte: number } },
    { 'productVariant.price': { $lte: number } },
  ];
}
