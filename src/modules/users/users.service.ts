import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(private usersRepository: UsersRepository) { }

  async create(createUserDto: CreateUserDto) {

    const findUser = await this.usersRepository.findUserByEmail(createUserDto.email)
    const findUserPhone = await this.usersRepository.findUserByPhone(createUserDto.phone)

    if (findUserPhone) throw new ConflictException("phone already exists!")
    if (findUser) throw new ConflictException("email already exists!")

    const user = await this.usersRepository.create(createUserDto)

    return user
  }

  async findAll() {

    const users = await this.usersRepository.findAll()

    return users
  }

  async findByEmail(email: string) {

    const user = await this.usersRepository.findUserByEmail(email)

    return user
  }

  async findOne(id: number) {

    const user = await this.usersRepository.findUser(id)

    if (!user) throw new NotFoundException("user not found!")

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    if(!id) throw new BadRequestException("id must have an id ")

    const findUserByEmail = await this.usersRepository.findUserByEmail(updateUserDto.email)
    const findUserPhone = await this.usersRepository.findUserByPhone(updateUserDto.phone)
    
    console.log(findUserByEmail)
    console.log(findUserPhone)

    if (findUserPhone) throw new ConflictException("phone already exists!")
    if (findUserByEmail) throw new ConflictException("email already exists!")

    const findUser = await this.usersRepository.findUser(id)

    if (!findUser) throw new NotFoundException("user not found!")

    const user = await this.usersRepository.update(id, updateUserDto)

    return user
  }

  async remove(id: number) {

    const findUser = await this.usersRepository.findUser(id)

    if (!findUser) throw new NotFoundException("user not found!")

    await this.usersRepository.delete(id)
  }
}
