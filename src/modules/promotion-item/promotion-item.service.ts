import { Injectable } from '@nestjs/common';
import { CreatePromotionItemDto } from './dto/create-promotion-item.dto';
import { UpdatePromotionItemDto } from './dto/update-promotion-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PromotionItem } from './entities/promotion-item.entity';
import { Model } from 'mongoose';

@Injectable()
export class PromotionItemService {
  constructor(
    @InjectModel(PromotionItem.name)
    private promotionModel: Model<PromotionItem>,
  ) {}

  async create(
    createPromotionItemDto: CreatePromotionItemDto,
  ): Promise<PromotionItem> {
    const promotionItem = new this.promotionModel(createPromotionItemDto);
    return promotionItem.save();
  }

  findAll() {
    return `This action returns all promotionItem`;
  }

  async findByProductSku(listSku: { sku: string }[]): Promise<PromotionItem[]> {
    const filter = {
      $or: listSku,
    };

    return this.promotionModel
      .find(filter)
      .sort({ sku: 1, displayOrder: 1 })
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} promotionItem`;
  }

  update(id: number, updatePromotionItemDto: UpdatePromotionItemDto) {
    return `This action updates a #${id} promotionItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotionItem`;
  }
}
