import { PartialType } from '@nestjs/mapped-types';
import { CreateAttributeSpecItemDto } from './create-attribute-spec-item.dto';

export class UpdateAttributeSpecItemDto extends PartialType(CreateAttributeSpecItemDto) {}
