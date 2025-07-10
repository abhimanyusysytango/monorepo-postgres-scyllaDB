import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { PrismaService } from '@demo-backend/shared';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(data: CreateProductDto) {
    return this.prisma.masterProduct.create({ data });
  }

  async updateProduct(id: number, data: UpdateProductDto) {
    return this.prisma.masterProduct.update({ where: { id }, data });
  }

  async listProducts(page = 1, limit = 10) {
    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      this.prisma.masterProduct.findMany({
        skip,
        take: Number(limit),
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          total_unit: true,
          sold_unit: true,
          created_at: true,
        }
      }),
      this.prisma.masterProduct.count()
    ]);
    const hasNextPage = skip + Number(limit) < total;
    return { data, total, page: Number(page), limit: Number(limit), hasNextPage };
  }
} 