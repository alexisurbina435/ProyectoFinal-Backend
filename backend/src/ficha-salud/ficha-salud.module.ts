import { Module } from '@nestjs/common';
import { FichaSaludService } from './services/ficha-salud.service';
import { FichaSaludController } from './controllers/ficha-salud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaSalud } from './entities/fichaSalud-entity';
import { Rutinas } from 'src/rutinas/entities/rutinas.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports:[TypeOrmModule.forFeature([FichaSalud,Rutinas,Usuario])],
  providers: [FichaSaludService],
  controllers: [FichaSaludController]
})
export class FichaSaludModule {}
