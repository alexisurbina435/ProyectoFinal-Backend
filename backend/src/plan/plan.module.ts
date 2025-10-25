import { Module } from '@nestjs/common';
import { PlanController } from './controllers/plan.controller';
import { PlanService } from './services/plan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { Rutinas } from 'src/rutinas/entities/rutinas.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Plan,Rutinas,Usuario])],
  controllers: [PlanController],
  providers: [PlanService]
})
export class PlanModule {}
