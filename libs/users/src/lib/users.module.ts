import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PrismaService, ScyllaService } from '@demo-backend/shared';
import { CommonJwtService } from '@demo-backend/common-jwt';
import { JwtStrategy } from './jwt.strategy';
import { ProductModule } from '@demo-backend/product';

@Module({
  imports: [JwtModule.register({}), ProductModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService, CommonJwtService, JwtStrategy,
    ScyllaService
  ],
  exports: [UsersService],
})
export class UsersModule {}
