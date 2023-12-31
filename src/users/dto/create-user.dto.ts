import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, isNotEmpty } from "class-validator";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";


export class CreateUserDto {
    @IsEmail()
    @ApiProperty({
        description: 'alp@alp.com'
    })
    email: string;

    @IsString()
    password: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}