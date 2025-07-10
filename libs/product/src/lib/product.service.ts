import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  async createProduct(data: CreateProductDto) {
    return this.productRepo.createProduct(data);
  }

  async updateProduct(id: number, data: UpdateProductDto) {
    return this.productRepo.updateProduct(id, data);
  }

  async listProducts(page = 1, limit = 10) {
    return this.productRepo.listProducts(page, limit);
  }
} 