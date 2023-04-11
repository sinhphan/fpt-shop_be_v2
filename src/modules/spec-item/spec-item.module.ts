import { Module } from '@nestjs/common';
import { SpecItemService } from './spec-item.service';
import { SpecItemController } from './spec-item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SpecItem, SpecItemSchema } from './entities/spec-item.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SpecItem.name,
        schema: SpecItemSchema,
      },
    ]),
  ],
  controllers: [SpecItemController],
  providers: [SpecItemService],
  exports: [SpecItemService],
})
export class SpecItemModule {}
