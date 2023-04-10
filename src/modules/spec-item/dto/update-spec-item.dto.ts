import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecItemDto } from './create-spec-item.dto';

export class UpdateSpecItemDto extends PartialType(CreateSpecItemDto) {}
