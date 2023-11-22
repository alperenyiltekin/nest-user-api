import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repository: Repository<User>) {}

    create(
        email: string, 
        password: string, 
        username: string, 
        createdAt: any,
        updatedAt: any
    ) {
        const user = this.repository.create({ email, password, username, createdAt, updatedAt });

        return this.repository.save(user);
    }

    findOne(email: string) {
        if (!email)
            return null;
        
        return this.repository.findOneBy({ email });
    }

    find(email: string) {
        return this.repository.find({ where: { email } });
    }

    async update(email: string, attrs: Partial<User>) {
        const user = await this.findOne(email);
        if (!user)
            throw new NotFoundException('User not found !');

        Object.assign(user, attrs);

        return this.repository.save(user);
    }

    async remove(email: string) {
        const user = await this.findOne(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.repository.remove(user);
    }

}
