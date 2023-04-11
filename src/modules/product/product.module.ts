import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { AttributeSpecItemService } from '../attribute-spec-item/attribute-spec-item.service';
import { AttributeSpecItemModule } from '../attribute-spec-item/attribute-spec-item.module';
import { PromotionItemModule } from '../promotion-item/promotion-item.module';
import { AttributeItemModule } from '../attribute-item/attribute-item.module';
import { CategoryModule } from '../category/category.module';
import { SpecItemModule } from '../spec-item/spec-item.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    AttributeSpecItemModule,
    PromotionItemModule,
    AttributeItemModule,
    CategoryModule,
    SpecItemModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
