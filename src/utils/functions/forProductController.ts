import { Request } from 'express';
import { APP_CONFIG } from 'src/config/app.config';
import { PriceFilterType } from '../types/product-filter.type';
import { QueryParseType } from '../types/query-parse.type';
import { isEmptyObject } from './isEmptyObject';

export const queryParser = (req: Request): QueryParseType => {
  let queryParsed: QueryParseType;
  const pageTemp = req.query.page;
  const brand = req.query.brand;
  const price = req.query.price;
  const cpu = req.query.cpu;
  const gpu = req.query.gpu;
  const screen = req.query.screen;
  const ssd = req.query.ssd;
  const ram = req.query.ram;
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
      $and: [{}],
    },
    attributeSpecItemsFilters: {
      $or: [],
    },
    hasAttributeSpecItemsQueries: false,
    productSort: { 'productVariant.stockQuantity': -1 },
  };

  // for generate  brand filter
  if (brand) {
    let brandNameFilter = {
      $regex: new RegExp(brand.toString()),
      $options: 'i',
    };
    if (isEmptyObject(queryParsed.productFilters.$and[0])) {
      queryParsed.productFilters.$and[0] = { brandName: brandNameFilter };
    } else {
      queryParsed.productFilters.$and.push({ brandName: brandNameFilter });
    }
  }

  // for product find product has installment payment 0%
  if (zeroPayment) {
    let zeroPaymentRegEx = {
      $regex: new RegExp(zeroPayment.toString()),
      $options: 'i',
    };

    if (isEmptyObject(queryParsed.productFilters.$and[0])) {
      queryParsed.productFilters.$and[0] = { labelInst: zeroPaymentRegEx };
    } else {
      queryParsed.productFilters.$and.push({ labelInst: zeroPaymentRegEx });
    }
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

    if (isEmptyObject(queryParsed.productFilters.$and[0])) {
      queryParsed.productFilters.$and[0] = { $or: priceConditions };
    } else {
      queryParsed.productFilters.$and.push({ $or: priceConditions });
    }
  }

  // for attribute spec item filter by screen
  if (screen) {
    let screenFilter = {
      $regex: new RegExp(screen.toString()),
      $options: 'i',
    };

    if (isEmptyObject(queryParsed.attributeSpecItemsFilters.$or[0])) {
      queryParsed.attributeSpecItemsFilters.$or[0] = {
        specName: screenFilter,
      };
    } else {
      queryParsed.attributeSpecItemsFilters.$or.push({
        specName: screenFilter,
      });
    }

    queryParsed.hasAttributeSpecItemsQueries = true;
  }

  // for attribute spec item filter by cpu
  if (cpu) {
    let cpuFilter = {
      $regex: new RegExp(cpu.toString()),
      $options: 'i',
    };

    if (isEmptyObject(queryParsed.attributeSpecItemsFilters.$or[0])) {
      queryParsed.attributeSpecItemsFilters.$or[0] = {
        specName: cpuFilter,
      };
    } else {
      queryParsed.attributeSpecItemsFilters.$or.push({
        specName: cpuFilter,
      });
    }

    queryParsed.hasAttributeSpecItemsQueries = true;
  }

  // for attribute spec item filter by gpu
  if (gpu) {
    let gpuFilter = {
      $regex: new RegExp(gpu.toString()),
      $options: 'i',
    };

    if (isEmptyObject(queryParsed.attributeSpecItemsFilters.$or[0])) {
      queryParsed.attributeSpecItemsFilters.$or[0] = {
        specName: gpuFilter,
      };
    } else {
      queryParsed.attributeSpecItemsFilters.$or.push({
        specName: gpuFilter,
      });
    }

    queryParsed.hasAttributeSpecItemsQueries = true;
  }

  // for attribute spec item filter by ssd
  if (ssd) {
    let ssdFilter = {
      $regex: new RegExp(ssd.toString()),
      $options: 'i',
    };

    if (isEmptyObject(queryParsed.attributeSpecItemsFilters.$or[0])) {
      queryParsed.attributeSpecItemsFilters.$or[0] = {
        specName: ssdFilter,
      };
    } else {
      queryParsed.attributeSpecItemsFilters.$or.push({
        specName: ssdFilter,
      });
    }

    queryParsed.hasAttributeSpecItemsQueries = true;
  }

  // for attribute spec item filter by ssd
  if (ram) {
    let ramFilter = {
      $regex: new RegExp(ram.toString()),
      $options: 'i',
    };

    if (isEmptyObject(queryParsed.attributeSpecItemsFilters.$or[0])) {
      queryParsed.attributeSpecItemsFilters.$or[0] = {
        specName: ramFilter,
      };
    } else {
      queryParsed.attributeSpecItemsFilters.$or.push({
        specName: ramFilter,
      });
    }

    queryParsed.hasAttributeSpecItemsQueries = true;
  }

  // for parse sort query string
  if (productSortBy) {
    const parsedSortQuery = parseSortQuery(productSortBy.toString());
    queryParsed.productSort = parsedSortQuery;
  }
  if (isEmptyObject(queryParsed.productFilters.$and[0]))
    delete queryParsed.productFilters;

  if (isEmptyObject(queryParsed.attributeSpecItemsFilters.$or[0]))
    delete queryParsed.attributeSpecItemsFilters;

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
