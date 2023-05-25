import { IsEmail, IsNotEmpty, IsString, Validate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserLoginDto {

    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
        
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

}
