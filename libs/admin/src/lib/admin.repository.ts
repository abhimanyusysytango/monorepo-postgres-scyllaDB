import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Admin } from '@prisma/client';

@Injectable()
export class AdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsername(username: string): Promise<Admin | null> {
    return this.prisma.admin.findUnique({ where: { username } });
  }

  async createAdmin(data: { username: string; password: string }): Promise<Admin> {
    return this.prisma.admin.create({ data });
  }

  async findAll(): Promise<Admin[]> {
    return this.prisma.admin.findMany();
  }

  async findById(id: number) {
    return this.prisma.admin.findUnique({ where: { id } });
  }

  async getAllUsers(page = 1, limit = 10) {
    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: Number(limit),
        select: {
          id: true,
          name: true,
          email: true,
          is_active: true,
          created_at: true,
        }
      }),
      this.prisma.user.count()
    ]);
    const hasNextPage = skip + Number(limit) < total;
    return { data, total, page: Number(page), limit: Number(limit), hasNextPage };
  }

  async setUserActiveStatus(id: number, is_active: boolean) {
    return this.prisma.user.update({ where: { id: Number(id) }, data: { is_active } });
  }
} 