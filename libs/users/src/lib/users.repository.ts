import { Injectable } from '@nestjs/common';
import { PrismaService } from '@demo-backend/shared';
import { User } from '@prisma/client';
import { ScyllaService } from '@demo-backend/shared';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService, private readonly scylla: ScyllaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(data: { name: string; email: string; password: string; balance?: number }): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getUserTransactions(userId: number) {
    const query = 'SELECT * FROM user_transactions WHERE user_id = ?';
    const result = await this.scylla.getClient().execute(query, [userId], { prepare: true });
    return result.rows;
  }
} 