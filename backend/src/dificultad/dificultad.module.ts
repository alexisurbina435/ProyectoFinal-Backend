import { Module } from '@nestjs/common';
import { DificultadService } from './dificultad.service';
import { DificultadController } from './dificultad.controller';
import { Dificultad } from './entities/dificultad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Dificultad])],
  controllers: [DificultadController],
  providers: [DificultadService],
})
export class DificultadModule {}
