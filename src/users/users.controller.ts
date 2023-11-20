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
import { AuthService }          from './auth.service';
import { CreateUserDto }        from './dto/create-user.dto';
import { UpdateUserDto }        from './dto/update-user.dto';
import { UserDto }              from './dto/user.dto';
import { Serialize }            from 'src/interceptors/serialize.interceptor';
import { CurrentUser }          from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User }                 from './entities/user.entity';
import { AuthGuard }            from 'src/guards/auth.guard';

@Controller('users')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) {}

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoami(@CurrentUser() user: User) {
        return user;
    } 

    @Post('/sign-out')
    signOut(@Session() session: any) {
        session.userId = null;
    }

    @Post('/sign-up')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/sign-in')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    //@UseInterceptors(new SerializeInterceptor(UserDto))
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = this.usersService.findOne(parseInt(id));
        if (!user)
            throw new NotFoundException('User not found')

        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }

}
