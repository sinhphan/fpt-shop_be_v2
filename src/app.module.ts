import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './modules/product/product.module';
import { AttributeSpecItemModule } from './modules/attribute-spec-item/attribute-spec-item.module';
import { PromotionItemModule } from './modules/promotion-item/promotion-item.module';
import { ENV } from './config/env.config';
import { AttributeItemModule } from './modules/attribute-item/attribute-item.module';
import { CategoryModule } from './modules/category/category.module';
import { SpecItemModule } from './modules/spec-item/spec-item.module';

@Module({
  imports: [
    MongooseModule.forRoot(ENV.mongoose),
    ProductModule,
    AttributeSpecItemModule,
    PromotionItemModule,
    AttributeItemModule,
    CategoryModule,
    SpecItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
