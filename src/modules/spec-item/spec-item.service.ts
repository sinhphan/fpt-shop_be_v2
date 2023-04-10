import { Injectable } from '@nestjs/common';
import { CreateSpecItemDto } from './dto/create-spec-item.dto';
import { UpdateSpecItemDto } from './dto/update-spec-item.dto';

@Injectable()
export class SpecItemService {
  create(createSpecItemDto: CreateSpecItemDto) {
    return 'This action adds a new specItem';
  }

  findAll() {
    return `This action returns all specItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} specItem`;
  }

  update(id: number, updateSpecItemDto: UpdateSpecItemDto) {
    return `This action updates a #${id} specItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} specItem`;
  }
}
