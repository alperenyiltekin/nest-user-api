import { NestFactory } 		from '@nestjs/core';
import { ValidationPipe } 	from '@nestjs/common';
import { 
	SwaggerModule,
	DocumentBuilder 
} 							from '@nestjs/swagger';
import { AppModule } 		from './app.module';

const cookieSession = require('cookie-session')

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieSession({
		keys: ['nest-user']
	}))
	
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true
		})
	)

	const config = new DocumentBuilder()
		.setTitle('User API Example')
		.setDescription('The user API description')
		.setVersion('1.0')
		.build();

  	const document = SwaggerModule.createDocument(app, config);
  	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}
bootstrap();