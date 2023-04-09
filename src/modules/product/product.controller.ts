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

  @Post()
  create(/*@Body() createProductDto: CreateProductDto*/) {
    data1.filterModel.listDefault.list.forEach(async (e) => {
      const product = await this.productService.create(e);

      // get attr of product
      const attributeSpecItemData = data1.filterModel.attributeSpecItems.filter(
        (attr) => e.id === attr.productID,
      );

      attributeSpecItemData.forEach(async (attr) => {
        const newAttr = { ...attr, productID: product };
        await this.attributeSpecItemService.create(newAttr);
      });

      //get promotion of products
      const promotions = data1.filterModel.promotionItems.filter(
        (promotion) => promotion.sku === e.productVariant.sku,
      );

      promotions.forEach(async (promotion) => {
        const newPromo = { ...promotion, productID: product };
        await this.promotionItemService.create(newPromo);
      });
    });

    data2.filterModel.listDefault.list.forEach(async (e) => {
      const product = await this.productService.create(e);

      // get attr of product
      const attributeSpecItemData = data2.filterModel.attributeSpecItems.filter(
        (attr) => e.id === attr.productID,
      );

      attributeSpecItemData.forEach(async (attr) => {
        const newAttr = { ...attr, productID: product };
        await this.attributeSpecItemService.create(newAttr);
      });

      //get promotion of products
      const promotions = data2.filterModel.promotionItems.filter(
        (promotion) => promotion.sku === e.productVariant.sku,
      );

      promotions.forEach(async (promotion) => {
        const newPromo = { ...promotion, productID: product };
        await this.promotionItemService.create(newPromo);
      });
    });

    data3.filterModel.listDefault.list.forEach(async (e) => {
      const product = await this.productService.create(e);

      // get attr of product
      const attributeSpecItemData = data3.filterModel.attributeSpecItems.filter(
        (attr) => e.id === attr.productID,
      );

      attributeSpecItemData.forEach(async (attr) => {
        const newAttr = { ...attr, productID: product };
        await this.attributeSpecItemService.create(newAttr);
      });

      //get promotion of products
      const promotions = data3.filterModel.promotionItems.filter(
        (promotion) => promotion.sku === e.productVariant.sku,
      );

      promotions.forEach(async (promotion) => {
        const newPromo = { ...promotion, productID: product };
        await this.promotionItemService.create(newPromo);
      });
    });

    data4.filterModel.listDefault.list.forEach(async (e) => {
      const product = await this.productService.create(e);

      // get attr of product
      const attributeSpecItemData = data4.filterModel.attributeSpecItems.filter(
        (attr) => e.id === attr.productID,
      );

      attributeSpecItemData.forEach(async (attr) => {
        const newAttr = { ...attr, productID: product };
        await this.attributeSpecItemService.create(newAttr);
      });

      //get promotion of products
      const promotions = data4.filterModel.promotionItems.filter(
        (promotion) => promotion.sku === e.productVariant.sku,
      );

      promotions.forEach(async (promotion) => {
        const newPromo = { ...promotion, productID: product };
        await this.promotionItemService.create(newPromo);
      });
    });

    return;
  }

  @Get()
  async find(@Req() req: Request) {
    const queryParsed = queryParse(req);

    await this.productService
      .find(queryParsed.pagination)
      .then((products) => {
        this.data = {
          listDefault: {
            list: products,
          },
        };

        // find all attr for product
        let listProductId = products.map((product) => {
          return { productID: product._id.toString() };
        });
        return this.attributeSpecItemService.findByListProductId(listProductId);
      })
      .then((attrSpecItems) => {
        this.data = {
          ...this.data,
          attributeSpecItems: attrSpecItems,
        };
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
