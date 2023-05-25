import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, maxLength } from "class-validator";

export class CreateContactDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fullName: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string;
    
}

