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
  const zeroPayment = req.query.zero;
  const productSortBy = req.query.sort;

  // for generate pagination
  const isPage = pageTemp && Number.isInteger(+pageTemp) && +pageTemp > 0;
  const page = isPage ? +pageTemp : 1;
  queryParsed = {
    pagination: {
      limit: APP_CONFIG.queryLimit,
      page: page,
    },
    productFilters: {
      $and: [{}, {}, {}],
    },
    attributeSpecItemsFilters: {
      $and: [{ $and: [{}] }, { $and: [{}] }],
    },
    hasAttributeSpecItemsFilters: false,
    productSort: { 'productVariant.stockQuantity': -1 },
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
          {},
        ],
      },
    };
  }

  // for product find product has installment payment 0%
  if (zeroPayment) {
    let zeroPaymentRegEx = {
      $regex: new RegExp(zeroPayment.toString()),
      $options: 'i',
    };

    queryParsed = {
      ...queryParsed,
      productFilters: {
        $and: [
          queryParsed.productFilters.$and[0],
          {
            labelInst: zeroPaymentRegEx,
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
        $and: [
          queryParsed.productFilters.$and[0],
          queryParsed.productFilters.$and[1],
          { $or: priceConditions },
        ],
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

  // for parse sort query string
  if (productSortBy) {
    const parsedSortQuery = parseSortQuery(productSortBy.toString());
    queryParsed = {
      ...queryParsed,
      productSort: parsedSortQuery,
    };
  }

  return queryParsed;
};

/**
 *
 * @param sortQuery
 * @returns
 */
function parseSortQuery(sortQuery: string) {
  if (sortQuery === 'low_price') return { 'productVariant.price': 1 };
  if (sortQuery === 'hight_price') return { 'productVariant.price': -1 };

  return { 'productVariant.stockQuantity': -1 };
}
