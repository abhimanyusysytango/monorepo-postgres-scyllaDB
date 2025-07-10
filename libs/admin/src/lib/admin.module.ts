import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { PrismaService } from './prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { CommonJwtService } from '@demo-backend/common-jwt';

@Module({
  imports: [
    JwtModule.register({}),
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, PrismaService, CommonJwtService, JwtStrategy],
})
export class AdminModule {}
