import { Controller, Post, Patch, Get, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { AdminAuthGuard, UserAuthGuard, AdminUserAuthGuard } from '@demo-backend/shared';
import { ProductUri } from '@demo-backend/shared';

@ApiTags(ProductUri.BASE)
@Controller(ProductUri.BASE)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post(ProductUri.CREATE)
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a product' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Sample Product' },
        description: { type: 'string', example: 'This is a sample product description' },
        price: { type: 'number', example: 99.99 },
        total_unit: { type: 'number', example: 100 }
      },
      required: ['name', 'price', 'total_unit']
    }
  })
  @ApiResponse({ status: 201, description: 'Product created' })
  async createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body);
  }

  @Patch(ProductUri.UPDATE)
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Updated Product Name' },
        description: { type: 'string', example: 'Updated product description' },
        price: { type: 'number', example: 149.99 },
        total_unit: { type: 'number', example: 200 }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Product updated' })
  async updateProduct(
    @Param('id') id: number,
    @Body() body: UpdateProductDto
  ) {
    return this.productService.updateProduct(id, body);
  }

  @Get(ProductUri.LIST)
  @UseGuards(AdminUserAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all products' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10, description: 'Number of items per page' })
  @ApiResponse({ status: 200, description: 'List of products' })
  async listProducts(
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ) {
    return this.productService.listProducts(page, limit);
  }
} 