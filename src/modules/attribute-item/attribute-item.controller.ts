import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttributeItemService } from './attribute-item.service';
import { CreateAttributeItemDto } from './dto/create-attribute-item.dto';
import { UpdateAttributeItemDto } from './dto/update-attribute-item.dto';

@Controller('attribute-item')
export class AttributeItemController {
  constructor(private readonly attributeItemService: AttributeItemService) {}

  @Post()
  create(@Body() createAttributeItemDto: CreateAttributeItemDto) {
    return this.attributeItemService.create(createAttributeItemDto);
  }

  @Get()
  findAll() {
    return this.attributeItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributeItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttributeItemDto: UpdateAttributeItemDto) {
    return this.attributeItemService.update(+id, updateAttributeItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attributeItemService.remove(+id);
  }
}
