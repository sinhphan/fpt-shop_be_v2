import { Module } from '@nestjs/common';
import { PromotionItemService } from './promotion-item.service';
import { PromotionItemController } from './promotion-item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PromotionItem,
  PromotionItemSchema,
} from './entities/promotion-item.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PromotionItem.name, schema: PromotionItemSchema },
    ]),
  ],
  controllers: [PromotionItemController],
  providers: [PromotionItemService],
  exports: [PromotionItemService],
})
export class PromotionItemModule {}
