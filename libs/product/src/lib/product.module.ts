import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from '@demo-backend/shared';
import { AdminAuthGuard, UserAuthGuard, AdminUserAuthGuard } from '@demo-backend/shared';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, AdminAuthGuard, UserAuthGuard, AdminUserAuthGuard],
  exports: [ProductService],
})
export class ProductModule {}
