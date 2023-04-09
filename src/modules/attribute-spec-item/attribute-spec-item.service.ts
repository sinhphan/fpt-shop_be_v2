import { Injectable } from '@nestjs/common';
import { CreateAttributeSpecItemDto } from './dto/create-attribute-spec-item.dto';
import { UpdateAttributeSpecItemDto } from './dto/update-attribute-spec-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AttributeSpecItem } from './entities/attribute-spec-item.entity';
import { Model, Types } from 'mongoose';
import { filter } from 'rxjs';

@Injectable()
export class AttributeSpecItemService {
  constructor(
    @InjectModel(AttributeSpecItem.name)
    private attributeSpecItem: Model<AttributeSpecItem>,
  ) {}

  create(createAttributeSpecItemDto: CreateAttributeSpecItemDto) {
    const attributeSpecItem = new this.attributeSpecItem(
      createAttributeSpecItemDto,
    );
    return attributeSpecItem.save();
  }

  findAll() {
    return `This action returns all attributeSpecItem`;
  }

  async findByListProductId(
    listProductId: { productID: string }[],
  ): Promise<AttributeSpecItem[]> {
    let filter = {
      $or: listProductId,
    };

    return this.attributeSpecItem.find(filter).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} attributeSpecItem`;
  }

  update(id: number, updateAttributeSpecItemDto: UpdateAttributeSpecItemDto) {
    return `This action updates a #${id} attributeSpecItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} attributeSpecItem`;
  }
}
