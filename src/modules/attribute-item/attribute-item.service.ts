import { Injectable } from '@nestjs/common';
import { CreateAttributeItemDto } from './dto/create-attribute-item.dto';
import { UpdateAttributeItemDto } from './dto/update-attribute-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AttributeItem } from './entities/attribute-item.entity';
import { Model } from 'mongoose';

@Injectable()
export class AttributeItemService {
  constructor(
    @InjectModel(AttributeItem.name)
    private attributeItemModel: Model<AttributeItem>,
  ) {}

  async create(
    createAttributeItemDto: CreateAttributeItemDto,
  ): Promise<AttributeItem> {
    const attributeItem = new this.attributeItemModel(createAttributeItemDto);
    return attributeItem.save();
  }

  async findAll(): Promise<AttributeItem[]> {
    return this.attributeItemModel.find().sort({ levelOrder: 1 }).exec();
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
