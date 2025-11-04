import { Module } from '@nestjs/common';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { Rutina } from 'src/rutina/entities/rutina.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan, Rutina, Usuario])],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
