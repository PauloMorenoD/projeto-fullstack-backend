import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";

export abstract class UsersRepository {
    abstract create(data: CreateUserDto): Promise<User>;
    abstract findUser(id:number): Promise<User>;
    abstract findUserByEmail(email:string): Promise<User>;
    abstract findUserByPhone(phone: string): Promise<User> 
    abstract findAll(): Promise<User[]>;
    abstract update(id:number, data: UpdateUserDto): Promise<User>;
    abstract delete(id:number): Promise<void>;
}