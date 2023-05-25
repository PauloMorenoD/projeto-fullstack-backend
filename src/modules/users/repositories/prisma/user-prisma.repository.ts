import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../users.repository";
import { CreateUserDto } from "../../dto/create-user.dto";
import { User } from "../../entities/user.entity";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { PrismaService } from "src/database/prisma.service";
import { plainToInstance } from "class-transformer";


@Injectable()
export class UserPrismaRepository implements UsersRepository {
    constructor(private prisma: PrismaService) { }
    
    async create(data: CreateUserDto): Promise<User> {
        
        const user = new User()
        Object.assign(user, { ...data })
        
        const newUser = await this.prisma.users.create({
            data: {
                email: user.email,
                fullName: user.fullName,
                password: user.password,
                phone: user.phone,
                registerDate: user.registerDate
            }
        })
        
        return plainToInstance(User, newUser)
    }
    async update(id: number, data: UpdateUserDto): Promise<User> {
        const user = await this.prisma.users.update({
            where: { id },
            data: { ...data }
        })
    
        return plainToInstance(User, user)
    }
    
    async delete(id: number): Promise<void> {
        await this.prisma.users.delete({
            where: { id }
        })
    }
    
    async findUserByEmail(email: string): Promise<User> {
        const user = await this.prisma.users.findUnique({
            where: { email }
        })

        return  user
    }

    async findUserByPhone(phone: string): Promise<User> {
        const user = await this.prisma.users.findUnique({
            where: { phone }
        })


        return plainToInstance(User, user)
    }

    async findAll(): Promise<User[]> {

        const users = await this.prisma.users.findMany()

        return plainToInstance(User, users)
    }

    async findUser(id: number): Promise<User> {
        const user = await this.prisma.users.findUnique({
            where: { id }
        })

        return plainToInstance(User, user)
    }


}