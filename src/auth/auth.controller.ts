import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Get,
    Post,
    Request,
    UseGuards,
    Session
}                       from '@nestjs/common';
import { AuthService }  from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UsersService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() body) {
        console.log("body", body);
        
        return this.authService.signIn(body.email, body.password)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('/sign-in')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const { email, password, username, createdAt, updatedAt} = body;
        const user = await this.userService.create(email, password, username, createdAt, updatedAt);
        //session.userId = user.id;
        return user;
    }
}
