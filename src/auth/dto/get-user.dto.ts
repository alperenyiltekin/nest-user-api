import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, isNotEmpty } from "class-validator";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";


export class GetUserDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'alp@alp.com'
    })
    email: string;

    @IsNotEmpty()
    password: string;

    // username: string;

    // createdAt: Date;

    // updatedAt: Date;
}