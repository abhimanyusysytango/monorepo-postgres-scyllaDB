import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { PrismaService } from '@demo-backend/shared';
import { JwtStrategy } from './jwt.strategy';
import { CommonJwtService } from '@demo-backend/common-jwt';
import { ProductModule } from '@demo-backend/product';

@Module({
  imports: [
    JwtModule.register({}),
    ProductModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, PrismaService, CommonJwtService, JwtStrategy],
})
export class AdminModule {}
