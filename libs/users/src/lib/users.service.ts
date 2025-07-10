import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as CryptoJS from 'crypto-js';
import { CommonJwtService } from '@demo-backend/common-jwt';
import { SignupUserDto, LoginUserDto, RefreshTokenDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwt: CommonJwtService
  ) {}

  async findAll() {
    return this.usersRepo.findAll();
  }

  async signup(dto: SignupUserDto) {
    const { name, email, password } = dto;
    const existing = await this.usersRepo.findByEmail(email);
    if (existing) throw new BadRequestException('Email already in use');
    const hashed = CryptoJS.SHA256(password).toString();
    return this.usersRepo.createUser({ name, email, password: hashed, balance: 1000.00 });
  }

  async login(dto: LoginUserDto) {
    const { email, password } = dto;
    const user = await this.usersRepo.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (user.is_active === false) throw new UnauthorizedException('Account is deactivated. Please contact admin.');
    const hashed = CryptoJS.SHA256(password).toString();
    if (user.password !== hashed) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id, email: user.email, role: 'user' };
    const access_token = this.jwt.signAccessToken(payload);
    const refresh_token = this.jwt.signRefreshToken(payload);
    return {
      access_token,
      refresh_token,
      user: { id: user.id, email: user.email, name: user.name }
    };
  }

  async refresh(dto: RefreshTokenDto) {
    const { refresh_token } = dto;
    const payload = this.jwt.verifyRefreshToken(refresh_token);
    return {
      access_token: this.jwt.signAccessToken({ sub: payload.sub, email: payload.email, role: payload.role })
    };
  }

  async findByEmail(email: string) {
    return this.usersRepo.findByEmail(email);
  }

  async findById(id: number) {
    const user = await this.usersRepo.findById(id);
    if (!user || user.is_active === false) throw new UnauthorizedException('Account is deactivated. Please contact admin.');
    return user;
  }
} 