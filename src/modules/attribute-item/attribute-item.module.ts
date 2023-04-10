import { Module } from '@nestjs/common';
import { AttributeItemService } from './attribute-item.service';
import { AttributeItemController } from './attribute-item.controller';

@Module({
  controllers: [AttributeItemController],
  providers: [AttributeItemService]
})
export class AttributeItemModule {}
