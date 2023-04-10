import { PartialType } from '@nestjs/mapped-types';
import { CreateAttributeItemDto } from './create-attribute-item.dto';

export class UpdateAttributeItemDto extends PartialType(CreateAttributeItemDto) {}
