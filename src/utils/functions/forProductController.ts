import { Request } from 'express';
import { APP_CONFIG } from 'src/config/app.config';
import { PriceFilterType } from '../types/product-filter.type';
import { QueryParseType } from '../types/query-parse.type';

export const queryParse = (req: Request): QueryParseType => {
  let queryParsed: QueryParseType;
  const pageTemp = req.query.page;
  const brand = req.query.brand;
  const price = req.query.price;
  const attributes = req.query.attr;
  // const cpu = req.query.cpu;
  // const ram = req.query.ram;
  // const gpu = req.query.gpu;
  // const ssd = req.query.ssd;

  // for generate pagination
  const isPage = pageTemp && Number.isInteger(+pageTemp) && +pageTemp > 0;
  const page = isPage ? +pageTemp : 1;
  queryParsed = {
    pagination: {
      limit: APP_CONFIG.queryLimit,
      page: page,
    },
    productFilters: {
      $and: [{}],
    },
    attributeSpecItemsFilters: {
      $and: [{ $and: [{}] }, { $and: [{}] }],
    },
    hasAttributeSpecItemsFilters: false,
  };

  // for generate  brand filter
  if (brand) {
    let brandNameFilter = {
      $regex: new RegExp(brand.toString()),
      $options: 'i',
    };

    queryParsed = {
      ...queryParsed,
      productFilters: {
        $and: [
          {
            brandName: brandNameFilter,
          },
          {},
        ],
      },
    };
  }

  // for generate price filter
  if (price) {
    // convert from 0-10e6|15e6-20e6 ----> ['0-10e6' , '15e6-20e6']
    const priceConditionsString = price.toString().split('|');
    // convert to PriceFilterType[]
    const priceConditions = priceConditionsString.map((priceCondition) => {
      const [gte, lte] = priceCondition.split('-');
      if (Number.isInteger(+lte) && Number.isInteger(+gte)) {
        const query: PriceFilterType = {
          $and: [
            { 'productVariant.price': { $gte: +gte } },
            { 'productVariant.price': { $lte: +lte } },
          ],
        };
        return query;
      }
    });

    queryParsed = {
      ...queryParsed,
      productFilters: {
        $and: [queryParsed.productFilters.$and[0], { $or: priceConditions }],
      },
    };
  }

  // for attribute spec item filter by screen
  if (attributes) {
    let attributesFilter = {
      $regex: new RegExp(attributes.toString()),
      $options: 'i',
    };

    queryParsed = {
      ...queryParsed,
      attributeSpecItemsFilters: {
        $and: [{ $and: [{ specName: attributesFilter }] }, {}],
      },
      hasAttributeSpecItemsFilters: true,
    };
  }

  return queryParsed;
};
