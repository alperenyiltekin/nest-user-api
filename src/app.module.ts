import { Module }			from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } 	from '@nestjs/typeorm';
import {
	ConfigModule,
	ConfigService
}							from '@nestjs/config';
import { AppController } 	from './app.controller';
import { AppService } 		from './app.service';
import { UsersModule } 		from './users/users.module';
import { User } 			from './users/entities/user.entity';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.env.${process.env.NODE_ENV}`
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => {
				return {
					type: 'sqlite',
					database: 'db.sqlite',
					synchronize: true,
					entities: [User]
				}
			}
		}),
		UsersModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
