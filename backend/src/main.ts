import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  // const cors = require('cors');
  // app.use(cors());
  app.setGlobalPrefix('api');
  app.use(cookieParser());
//   app.enableCors({
//   origin:  'http://localhost:5173',
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true, 
// });
app.enableCors({
  origin: ['https://proyectofinal-backend-7797.onrender.com',  /// direccion que te provee la pagina render
            'http://localhost:5173'],
           METHODS: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          credentials: false,
 });

  // Validamos y transformamos los DTO para que respeten los tipos declarados
  app.useGlobalPipes(
    new ValidationPipe({
      // transform: true,
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
      // whitelist: true,
      // forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();