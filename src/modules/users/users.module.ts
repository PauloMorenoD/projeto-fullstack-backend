import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from './repositories/users.repository';
import { UserPrismaRepository } from './repositories/prisma/user-prisma.repository';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaService,
    UsersService,
    {
      provide: UsersRepository,
      useClass: UserPrismaRepository
    },
  ],
  exports: [UsersService]
})
export class UsersModule {}
