import { IsEmail, IsNotEmpty, IsString, Validate } from "class-validator";
import { Transform } from "class-transformer";
import { hashSync } from "bcryptjs";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fullName: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => hashSync(value, 10),{
        groups: ['transform']
    })
    password: string;

}
