import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PrismaService } from './prisma.service';
import { CommonJwtService } from '@demo-backend/common-jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({}),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService, CommonJwtService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
