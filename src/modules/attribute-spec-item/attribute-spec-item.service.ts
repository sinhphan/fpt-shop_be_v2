import { Injectable } from '@nestjs/common';
import { CreateAttributeSpecItemDto } from './dto/create-attribute-spec-item.dto';
import { UpdateAttributeSpecItemDto } from './dto/update-attribute-spec-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AttributeSpecItem } from './entities/attribute-spec-item.entity';
import { Model, Types } from 'mongoose';
import { filter } from 'rxjs';
import { AttributeSpecItemFilterType } from 'src/utils/types/attribute-spec-item-filter.type';

@Injectable()
export class AttributeSpecItemService {
  constructor(
    @InjectModel(AttributeSpecItem.name)
    private attributeSpecItemModel: Model<AttributeSpecItem>,
  ) {}

  create(createAttributeSpecItemDto: CreateAttributeSpecItemDto) {
    const attributeSpecItem = new this.attributeSpecItemModel(
      createAttributeSpecItemDto,
    );
    return attributeSpecItem.save();
  }

  async findByQuery(
    filter: AttributeSpecItemFilterType,
  ): Promise<AttributeSpecItem[]> {
    return this.attributeSpecItemModel.find(filter).exec();
  }

  async findByListProductId(
    listProductId: { productID: string }[],
  ): Promise<AttributeSpecItem[]> {
    let filter = {
      $or: listProductId,
    };

    return this.attributeSpecItemModel.find(filter).exec();
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
