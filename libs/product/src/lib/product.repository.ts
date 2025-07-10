import { Injectable } from '@nestjs/common';
import { ScyllaService } from '@demo-backend/shared';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductRepository {
  constructor(private readonly scylla: ScyllaService) {}

  async createProduct(data: CreateProductDto) {
    const query = 'INSERT INTO products (id, name, description, price, total_unit, created_at) VALUES (?, ?, ?, ?, ?, ?)';
    const id = Date.now(); // Example, use a better unique ID in production
    const params = [id, data.name, data.description, data.price, data.total_unit, new Date()];
    await this.scylla.getClient().execute(query, params, { prepare: true });
    return { id, ...data, created_at: new Date() };
  }

  async updateProduct(id: number, data: UpdateProductDto) {
    const query = 'UPDATE products SET name = ?, description = ?, price = ?, total_unit = ? WHERE id = ?';
    const params = [data.name, data.description, data.price, data.total_unit, id];
    await this.scylla.getClient().execute(query, params, { prepare: true });
    return { id, ...data };
  }

  async listProducts(page = 1, limit = 10) {
    const offset = (Number(page) - 1) * Number(limit);
    const query = 'SELECT id, name, description, price, total_unit, created_at FROM products LIMIT ?';
    const params = [Number(limit)];
    const result = await this.scylla.getClient().execute(query, params, { prepare: true });
    // Note: Cassandra/ScyllaDB does not support OFFSET, so pagination should use token-based paging in production
    return { data: result.rows, total: result.rows.length, page: Number(page), limit: Number(limit), hasNextPage: false };
  }
} 