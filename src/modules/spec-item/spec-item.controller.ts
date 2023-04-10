import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecItemService } from './spec-item.service';
import { CreateSpecItemDto } from './dto/create-spec-item.dto';
import { UpdateSpecItemDto } from './dto/update-spec-item.dto';

@Controller('spec-item')
export class SpecItemController {
  constructor(private readonly specItemService: SpecItemService) {}

  @Post()
  create(@Body() createSpecItemDto: CreateSpecItemDto) {
    return this.specItemService.create(createSpecItemDto);
  }

  @Get()
  findAll() {
    return this.specItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecItemDto: UpdateSpecItemDto) {
    return this.specItemService.update(+id, updateSpecItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specItemService.remove(+id);
  }
}
