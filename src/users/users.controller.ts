import { 
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    Query, 
    NotFoundException,
    Session,
    UseInterceptors,
    ClassSerializerInterceptor,
    UseGuards
}                               from '@nestjs/common';
import { UsersService }         from './users.service';
import { AuthService }          from 'src/auth/auth.service';
import { CreateUserDto }        from './dto/create-user.dto';
import { UpdateUserDto }        from './dto/update-user.dto';
import { UserDto }              from './dto/user.dto';
import { Serialize }            from 'src/interceptors/serialize.interceptor';
import { CurrentUser }          from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User }                 from './entities/user.entity';
import { AuthGuard }            from 'src/guards/auth.guard';

@Controller('users')
//@UseGuards(AuthGuard)
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) {}

    // @Post('/sign-out')
    // signOut(@Session() session: any) {
    //     session.userId = null;
    // }

    // @Post('/sign-up')
    // async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    //     const user = await this.authService.signup(body.email, body.password);
    //     session.userId = user.id;
    //     return user;
    // }

    // @Post('/sign-in')
    // async signin(@Body() body: CreateUserDto, @Session() session: any) {
    //     const user = await this.authService.signin(body.email, body.password);
    //     session.userId = user.id;
    //     return user;
    // }

    //@UseInterceptors(new SerializeInterceptor(UserDto))
    @Get('/:email')
    async findUser(@Param('email') email: string) {
        const user = this.usersService.findOne(email);
        if (!user)
            throw new NotFoundException('User not found')

        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete('/:email')
    removeUser(@Param('email') email: string) {
        return this.usersService.remove(email);
    }

    @Patch('/:email')
    updateUser(@Param('email') email: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(email, body);
    }

}
