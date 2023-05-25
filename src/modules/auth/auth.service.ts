import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/repositories/users.repository';
import { UsersService } from '../users/users.service';
import { compare } from "bcryptjs"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) { }

    async validator(email: string, password: string) {

        const user = await this.userService.findByEmail(email)
        if (user) {
            const passwordComparison = await compare(password, user.password)
            
            if (passwordComparison) {
                return { email: user.email }

            }
        }
        return null
    }

    async login(email: string) {
        const user = await this.userService.findByEmail(email)

        return {
            token: this.jwtService.sign({ email }, {subject: String(user.id)})
        }
    }
}
