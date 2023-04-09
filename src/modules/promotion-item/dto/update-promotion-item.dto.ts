import { PartialType } from '@nestjs/mapped-types';
import { CreatePromotionItemDto } from './create-promotion-item.dto';

export class UpdatePromotionItemDto extends PartialType(CreatePromotionItemDto) {}
