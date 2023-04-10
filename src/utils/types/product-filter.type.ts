import { StringFilterType } from './string-filter.type';

export interface ProductFilterType {
  $and?:
    | [
        {
          brandName?: StringFilterType | {};
        },
        (
          | {
              labelInst?: string;
            }
          | {}
        ),
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
