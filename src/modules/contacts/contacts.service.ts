import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private contactsRepository: ContactsRepository) { }

  async create(createContactDto: CreateContactDto, userId:number) {

    const findContact = await this.contactsRepository.findContactByEmail(createContactDto.email)
    const findContactByPhone = await this.contactsRepository.findContactByPhone(createContactDto.phone)

    if (findContact) throw new ConflictException("this email already exists!")
    if (findContactByPhone) throw new ConflictException("this phone already exists!")

    const contact = await this.contactsRepository.create(createContactDto, userId)

    return contact
  }

  async findAll() {

    const contacts = await this.contactsRepository.findAllContact()

    return contacts
  }

  async findOne(id: number) {

    const contact = await this.contactsRepository.findOneContact(id)

    if (!contact) throw new NotFoundException("contact not found")

    return contact
  }

  async update(id: number, updateContactDto: UpdateContactDto) {

    const findContact = await this.contactsRepository.findOneContact(id)

    if (!findContact) throw new NotFoundException("contact not found!")

    const contact = await this.contactsRepository.update(id, updateContactDto)

    return contact
  }

  async remove(id: number) {

    const findContact = await this.contactsRepository.findOneContact(id)

    if (!findContact) throw new NotFoundException("contact not found!")

    await this.contactsRepository.delete(id)
  }
}
