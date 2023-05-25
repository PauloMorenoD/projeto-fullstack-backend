import { Contacts } from "@prisma/client";
import { CreateContactDto } from "../dto/create-contact.dto";
import { UpdateContactDto } from "../dto/update-contact.dto";
import { Contact } from "../entities/contact.entity";

export abstract class ContactsRepository {
    abstract create(data: CreateContactDto, userId:number): Promise<Contacts>;
    abstract findOneContact(id: number): Promise<Contacts>;
    abstract findContactByEmail(email:string): Promise<Contacts>;
    abstract findContactByPhone(phone: string): Promise<Contacts> 
    abstract findAllContact(): Promise<Contacts[]>;
    abstract update(id: number, data: UpdateContactDto): Promise<Contacts>;
    abstract delete(id: number): Promise<void>;
}