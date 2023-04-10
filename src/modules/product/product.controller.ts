import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { AttributeSpecItemService } from '../attribute-spec-item/attribute-spec-item.service';
import { data1 } from 'src/data/data1';
import { Types } from 'mongoose';
import { Product } from './entities/product.entity';
import { PromotionItemService } from '../promotion-item/promotion-item.service';
import { Request, query } from 'express';
import { queryParse } from 'src/utils/functions';
import { data2 } from 'src/data/data2';
import { data3 } from 'src/data/data3';
import { data4 } from 'src/data/data4';
import { dataType } from 'src/utils/types/data.type';
import { AttributeSpecItem } from '../attribute-spec-item/entities/attribute-spec-item.entity';

@Controller('product')
export class ProductController {
  private data: dataType;

  constructor(
    private readonly productService: ProductService,
    private readonly attributeSpecItemService: AttributeSpecItemService,
    private readonly promotionItemService: PromotionItemService,
  ) {}

  @Get()
  async find(@Req() req: Request) {
    const queryParsed = queryParse(req);

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
      if (queryParsed.hasAttributeSpecItemsFilters) {
        const attributeSpecItems =
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
         * let Products ---> new products after filtered with attributeSpecItem.productId
         */
        products = products.filter((product) =>
          productIds.includes(product._id.toString()),
        );

        /**
         * let listSku -> new  listSku after Products filtered with attributeSpecItem.productId
         */
        listSku = products.map((product) => {
          return { sku: product.productVariant.sku };
        });

        const promotions = await this.promotionItemService.findByProductSku(
          listSku,
        );

        return (this.data = {
          listDefault: {
            list: products,
          },
          attributeSpecItems: attributeSpecItems,
          promotionItems: promotions,
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

        return (this.data = {
          listDefault: {
            list: products,
          },
          attributeSpecItems: attributeSpecItems,
          promotionItems: promotions,
        });
      }
    });

    return this.data;
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
