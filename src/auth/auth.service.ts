import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        // @InjectRepository(User) private repository: Repository<User>,
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn (email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        
        if(user?.password !== pass)
            throw new UnauthorizedException();

        const payload = {
            sub     : user.id,
            username: user.username
        }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
