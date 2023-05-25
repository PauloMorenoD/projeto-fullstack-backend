import { Injectable } from "@nestjs/common";
import { ContactsRepository } from "../contacts.repository";
import { CreateContactDto } from "../../dto/create-contact.dto";
import { UpdateContactDto } from "../../dto/update-contact.dto";
import { Contact } from "../../entities/contact.entity";
import { PrismaService } from "src/database/prisma.service";
import { Contacts } from "@prisma/client";

@Injectable()
export class ContactsPrismaRepository implements ContactsRepository {
    constructor(private prisma: PrismaService) { }
    async findContactByEmail(email: string): Promise<Contacts> {

        const contact = await this.prisma.contacts.findUnique({
            where: { email }
        })

        return contact
    }

    async findContactByPhone(phone: string): Promise<Contacts> {

        const contact = await this.prisma.contacts.findUnique({
            where: { phone }
        })

        return contact
    }

    async findAllContact(): Promise<Contacts[]> {

        const contacts = await this.prisma.contacts.findMany()

        return contacts
    }

    async findOneContact(id: number): Promise<Contacts> {

        const contact = await this.prisma.contacts.findUnique({
            where: { id }
        })

        return contact
    }

    async create(data: CreateContactDto, userId: number): Promise<Contacts> {

        const contact = new Contact()

        Object.assign(contact, { ...data, userId: +userId })

        const newContact = await this.prisma.contacts.create({
            data: { ...contact}
        })

        return newContact
    }

    async update(id: number, data: UpdateContactDto): Promise<Contacts> {

        const contact = await this.prisma.contacts.update({
            where: { id },
            data
        })

        return contact
    }
    async delete(id: number): Promise<void> {

        await this.prisma.contacts.delete({
            where: { id }
        })
    }

}