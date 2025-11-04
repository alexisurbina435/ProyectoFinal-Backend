import { Module } from '@nestjs/common';
import { FichaSaludService } from './ficha-salud.service';
import { FichaSaludController } from './ficha-salud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaSalud } from './entities/fichaSalud-entity';
import { Rutina } from 'src/rutina/entities/rutina.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FichaSalud, Rutina, Usuario])],
  providers: [FichaSaludService],
  controllers: [FichaSaludController],
})
export class FichaSaludModule {}
