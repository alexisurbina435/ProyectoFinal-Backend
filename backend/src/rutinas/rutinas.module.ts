import { Module } from '@nestjs/common';
import { RutinasController } from './controllers/rutinas.controller';
import { RutinasService } from './services/rutinas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rutinas } from './entities/rutinas.entity';
import { Administrador } from 'src/administrador/entities/administrador.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Plan } from 'src/plan/entities/plan.entity';
import { FichaSalud } from 'src/ficha-salud/entities/fichaSalud-entity';


@Module({
  imports: [TypeOrmModule.forFeature([Rutinas,Administrador,Usuario,Plan,FichaSalud])],
  controllers: [RutinasController],
  providers: [RutinasService],
  
})
export class RutinasModule {}
