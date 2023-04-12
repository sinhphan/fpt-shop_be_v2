import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model, Types } from 'mongoose';
import { PaginationType } from 'src/utils/types/pagination.type';
import { QueryParseType } from 'src/utils/types/query-parse.type';
import { ProductFilterType } from 'src/utils/types/product-filter.type';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  /**
   *
   * @param query
   * @returns Promise<Product[]>
   */
  async find(query: QueryParseType): Promise<Product[]> {
    const skip: number = query.pagination.limit * (query.pagination.page - 1);
    const filter = query.productFilters ? query.productFilters : null;
    // setup filter for query
    return this.productModel
      .find(filter)
      .sort(query.productSort)
      .limit(query.pagination.limit)
      .skip(skip)
      .exec();
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
