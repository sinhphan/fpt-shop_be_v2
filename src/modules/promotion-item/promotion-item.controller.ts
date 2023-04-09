import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PromotionItemService } from './promotion-item.service';
import { CreatePromotionItemDto } from './dto/create-promotion-item.dto';
import { UpdatePromotionItemDto } from './dto/update-promotion-item.dto';

@Controller('promotion-item')
export class PromotionItemController {
  constructor(private readonly promotionItemService: PromotionItemService) {}

  @Post()
  create(@Body() createPromotionItemDto: CreatePromotionItemDto) {
    return this.promotionItemService.create(createPromotionItemDto);
  }

  @Get()
  findAll() {
    return this.promotionItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promotionItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromotionItemDto: UpdatePromotionItemDto) {
    return this.promotionItemService.update(+id, updatePromotionItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promotionItemService.remove(+id);
  }
}
