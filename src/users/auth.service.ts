import { 
    Injectable, 
    BadRequestException,
    NotFoundException
}                       from "@nestjs/common";
import { 
    randomBytes, 
    scrypt 
}                       from "crypto";
import { promisify }    from "util";
import { UsersService } from "./users.service";

const crypt = promisify(scrypt)

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(email: string, password: string) {
        const users = await this.usersService.find(email);
        if (users.length)
            throw new BadRequestException('Email in use');

        const salt = randomBytes(8).toString('hex');
        const hashed = (await crypt(password, salt, 32)) as Buffer;
        const result = salt + '.' + hashed.toString('hex');

        const user = await this.usersService.create(email, result);
        return user;
    }

    async signin(email: string, password: string) {
        const [user] = await this.usersService.find(email);

        if (!user)
            throw new NotFoundException('User not found');

        const [salt, hashed] = user.password.split('.');
        const decryptedHash = (await crypt(password, salt, 32)) as Buffer;

        if ( hashed !== decryptedHash.toString('hex'))
            throw new BadRequestException('Wrong password');

        return user;
        
    }
}