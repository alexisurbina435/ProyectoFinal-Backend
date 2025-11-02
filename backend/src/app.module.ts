/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdministradorModule } from './administrador/administrador.module';
import { RutinasModule } from './rutinas/rutinas.module';
import { BlogModule } from './blog/blog.module';
import { EjercicioModule } from './ejercicio/ejercicio.module';
import { FichaSaludModule } from './ficha-salud/ficha-salud.module';
import { RutinaDiasModule } from './rutina-dias/rutina-dias.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DetalleVentaModule } from './detalle_venta/detalle_venta.module';
import { PlanModule } from './plan/plan.module';
import { ContactoModule } from './contacto/contacto.module';
import { RegistroModule } from './registro/registro.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        //  synchronize:false, // la dejamos en false cuando tenemos las tablas creadas y no queremos que nos cambie o modifique las tablas.(solo consultas a la base de dato)
        synchronize: configService.get('NODE_ENV') === 'development', // cuando queremos modificar o cargar tablas usamos este.
        
      }),
      inject: [ConfigService],
    }),
    AdministradorModule,
    RutinasModule,
    BlogModule,
    EjercicioModule,
    FichaSaludModule,
    RutinaDiasModule,
    UsuarioModule,
    DetalleVentaModule,
    PlanModule,
    ContactoModule,
    RegistroModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
