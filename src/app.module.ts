import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './modules/product/product.module';
import { AttributeSpecItemModule } from './modules/attribute-spec-item/attribute-spec-item.module';
import { PromotionItemModule } from './modules/promotion-item/promotion-item.module';
import { AttributeItemModule } from './modules/attribute-item/attribute-item.module';
import { CategoryModule } from './modules/category/category.module';
import { SpecItemModule } from './modules/spec-item/spec-item.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [databaseConfig] }),
    MongooseModule.forRoot(process.env.DATABASE_LINK),
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
