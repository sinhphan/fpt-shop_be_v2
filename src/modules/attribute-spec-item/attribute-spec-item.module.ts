import { Module } from '@nestjs/common';
import { AttributeSpecItemService } from './attribute-spec-item.service';
import { AttributeSpecItemController } from './attribute-spec-item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AttributeSpecItem,
  AttributeSpecItemSchema,
} from './entities/attribute-spec-item.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AttributeSpecItem.name, schema: AttributeSpecItemSchema },
    ]),
  ],
  controllers: [AttributeSpecItemController],
  providers: [AttributeSpecItemService],
  exports: [AttributeSpecItemService],
})
export class AttributeSpecItemModule {}
