import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ContactsPrismaRepository } from './repositories/prisma/contacts-prisma.repository';
import { ContactsRepository } from './repositories/contacts.repository';

@Module({
  controllers: [ContactsController],
  providers: [
    PrismaService,
    ContactsService,
    {
      provide: ContactsRepository,
      useClass: ContactsPrismaRepository
    }
  ]
})
export class ContactsModule {}
