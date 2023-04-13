import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { AttributeSpecItemService } from '../attribute-spec-item/attribute-spec-item.service';
import { Types } from 'mongoose';
import { PromotionItemService } from '../promotion-item/promotion-item.service';
import { Request } from 'express';

import { dataType } from 'src/utils/types/data.type';
import { CategoryService } from '../category/category.service';
import { SpecItemService } from '../spec-item/spec-item.service';
import { AttributeItemService } from '../attribute-item/attribute-item.service';
import { PromotionItem } from '../promotion-item/entities/promotion-item.entity';
import { queryParser } from 'src/utils/functions';

/**
 * @example url
 * /product?
 * brand=Apple|asus|hp&
 * price=0-10e6|20e6-25e6&
 * page=2&
 * cpu=i5|i7|r5|r7&
 * gpu=amd|nvidia&
 * ram= 4 Gb|8 Gb
 * screen=13inch|14 inch
 * zero=Trả góp 0%&
 * sort=low_price  one in [low_price,hight_price,best_sell]
 */
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly attributeSpecItemService: AttributeSpecItemService,
    private readonly promotionItemService: PromotionItemService,
    private readonly attributeItemService: AttributeItemService,
    private readonly categoryService: CategoryService,
    private readonly specItemService: SpecItemService,
  ) {}

  @Get()
  /* --------------- @Header('Content-Type', 'application/json') -------------- */
  async find(@Req() req: Request) {
    let data: dataType;
    const queryParsed = queryParser(req);

    // get data for menu and navigation
    const [categories, attributeItems, specItems] = await Promise.all([
      this.categoryService.findAll(),
      this.attributeItemService.findAll(),
      this.specItemService.findAll(),
    ]);
    // get products with product queries
    await this.productService.find(queryParsed).then(async (products) => {
      /**
       * @const list of productID generate for filter in promotionItems & attributeSpecItems collection
       * @type { productID: string }[]
       */
      let listProductIdForFilter: { productID: string }[] = products.map(
        (product) => {
          return { productID: product._id.toString() };
        },
      );

      // for find all sku for product
      let listSku = products.map((product) => {
        return { sku: product.productVariant.sku };
      });

      // find attributes and promotions
      //find product when has query in attributeSpecItems collection
      if (queryParsed.hasAttributeSpecItemsQueries) {
        let promotions: PromotionItem[];
        let attributeSpecItems =
          await this.attributeSpecItemService.findByQuery(
            queryParsed.attributeSpecItemsFilters,
          );

        /**
         * @const list of productID for filter products with attributeSpecItem.productId
         * @type string[]
         */
        const productIds: string[] = attributeSpecItems.map((attr) => {
          return attr.productID._id.toString();
        });

        /**
         * Products ---> new products after filtered with attributeSpecItem.productId
         */
        products = products.filter((product) =>
          productIds.includes(product._id.toString()),
        );

        listProductIdForFilter = products.map((e) => {
          return { productID: e._id.toString() };
        });

        /**
         * let listSku -> new  listSku after Products filtered with attributeSpecItem.productId
         */
        listSku = products.map((product) => {
          return { sku: product.productVariant.sku };
        });

        [attributeSpecItems, promotions] = await Promise.all([
          this.attributeSpecItemService.findByListProductId(
            listProductIdForFilter,
          ),
          this.promotionItemService.findByProductSku(listSku),
        ]);

        return (data = {
          listDefault: {
            list: products,
          },
          attributeSpecItems: attributeSpecItems,
          promotionItems: promotions,
          navFilter: {
            listCategory: categories,
          },
          navFilterAttributeItem: {
            attributeItems: attributeItems,
            specItems: specItems,
          },
        });
      }
      //find product when hasn't query in attributeSpecItems collection
      else {
        const [attributeSpecItems, promotions] = await Promise.all([
          this.attributeSpecItemService.findByListProductId(
            listProductIdForFilter,
          ),
          this.promotionItemService.findByProductSku(listSku),
        ]);

        return (data = {
          listDefault: {
            list: products,
          },
          attributeSpecItems: attributeSpecItems,
          promotionItems: promotions,
          navFilter: {
            listCategory: categories,
          },
          navFilterAttributeItem: {
            attributeItems: attributeItems,
            specItems: specItems,
          },
        });
      }
    });

    return data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const convertedId = new Types.ObjectId(id);
    return this.productService.update(convertedId, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
