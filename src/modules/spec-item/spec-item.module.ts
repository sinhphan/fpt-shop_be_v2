import { Module } from '@nestjs/common';
import { SpecItemService } from './spec-item.service';
import { SpecItemController } from './spec-item.controller';

@Module({
  controllers: [SpecItemController],
  providers: [SpecItemService]
})
export class SpecItemModule {}
