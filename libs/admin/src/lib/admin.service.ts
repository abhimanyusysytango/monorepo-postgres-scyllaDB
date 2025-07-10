import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import * as CryptoJS from 'crypto-js';
import { CommonJwtService } from '@demo-backend/common-jwt';
import { PrismaService } from './prisma.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepo: AdminRepository,
    private readonly jwt: CommonJwtService,
    private readonly prisma: PrismaService
  ) {}

  async login(username: string, password: string) {
    const admin = await this.adminRepo.findByUsername(username);
    if (!admin) throw new UnauthorizedException('Invalid credentials');
    if (admin.is_active === false) throw new UnauthorizedException('Account is deactivated. Please contact super admin.');
    const hashed = CryptoJS.SHA256(password).toString();
    if (admin.password !== hashed) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: admin.id, username: admin.username, role: 'admin' };
    const access_token = this.jwt.signAccessToken(payload);
    const refresh_token = this.jwt.signRefreshToken(payload);
    return {
      access_token,
      refresh_token,
      admin: { id: admin.id, username: admin.username }
    };
  }

  async refresh(refreshToken: string) {
    const payload = this.jwt.verifyRefreshToken(refreshToken);
    return {
      access_token: this.jwt.signAccessToken({ sub: payload.sub, username: payload.username, role: payload.role })
    };
  }

  async findById(id: number) {
    const admin = await this.adminRepo.findById(id);
    if (!admin || admin.is_active === false) throw new UnauthorizedException('Account is deactivated. Please contact admin.');
    return admin;
  }

  async getAllUsers(page = 1, limit = 10) {
    return this.adminRepo.getAllUsers(page, limit);
  }

  async setUserActiveStatus(id: number, is_active: boolean) {
    return this.adminRepo.setUserActiveStatus(id, is_active);
  }
} 