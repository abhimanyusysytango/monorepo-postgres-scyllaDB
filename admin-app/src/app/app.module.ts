import { Module } from '@nestjs/common';
import { AdminModule } from '@demo-backend/admin';

@Module({
  imports: [AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
