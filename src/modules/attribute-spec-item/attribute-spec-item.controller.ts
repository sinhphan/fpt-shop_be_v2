import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttributeSpecItemService } from './attribute-spec-item.service';
import { CreateAttributeSpecItemDto } from './dto/create-attribute-spec-item.dto';
import { UpdateAttributeSpecItemDto } from './dto/update-attribute-spec-item.dto';

@Controller('attribute-spec-item')
export class AttributeSpecItemController {
  constructor(private readonly attributeSpecItemService: AttributeSpecItemService) {}

  @Post()
  create(@Body() createAttributeSpecItemDto: CreateAttributeSpecItemDto) {
    return this.attributeSpecItemService.create(createAttributeSpecItemDto);
  }

  @Get()
  findAll() {
    return this.attributeSpecItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributeSpecItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttributeSpecItemDto: UpdateAttributeSpecItemDto) {
    return this.attributeSpecItemService.update(+id, updateAttributeSpecItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attributeSpecItemService.remove(+id);
  }
}
