import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model, Types } from 'mongoose';
import { PaginationType } from 'src/utils/types/pagination.type';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async find(pagination: PaginationType): Promise<Product[]> {
    const skip = pagination.limit * (pagination.page - 1);

    return this.productModel.find().limit(pagination.limit).skip(skip).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: Types.ObjectId, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(updateProductDto);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
