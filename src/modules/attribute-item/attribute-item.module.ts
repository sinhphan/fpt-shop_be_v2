import { Module } from '@nestjs/common';
import { AttributeItemService } from './attribute-item.service';
import { AttributeItemController } from './attribute-item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AttributeItem,
  AttributeItemSchema,
} from './entities/attribute-item.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AttributeItem.name, schema: AttributeItemSchema },
    ]),
  ],
  controllers: [AttributeItemController],
  providers: [AttributeItemService],
  exports: [AttributeItemService],
})
export class AttributeItemModule {}
