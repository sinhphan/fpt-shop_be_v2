import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './modules/product/product.module';
import { AttributeSpecItemModule } from './modules/attribute-spec-item/attribute-spec-item.module';
import { PromotionItemModule } from './modules/promotion-item/promotion-item.module';
import { ENV } from './config/env.config';

@Module({
  imports: [
    MongooseModule.forRoot(ENV.mongoose),
    ProductModule,
    AttributeSpecItemModule,
    PromotionItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
