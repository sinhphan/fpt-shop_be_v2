import { Injectable } from '@nestjs/common';
import { CreateAttributeItemDto } from './dto/create-attribute-item.dto';
import { UpdateAttributeItemDto } from './dto/update-attribute-item.dto';

@Injectable()
export class AttributeItemService {
  create(createAttributeItemDto: CreateAttributeItemDto) {
    return 'This action adds a new attributeItem';
  }

  findAll() {
    return `This action returns all attributeItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attributeItem`;
  }

  update(id: number, updateAttributeItemDto: UpdateAttributeItemDto) {
    return `This action updates a #${id} attributeItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} attributeItem`;
  }
}
