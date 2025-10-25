import { Module } from '@nestjs/common';
import { RutinaDiasService } from './services/rutina-dias.service';
import { RutinaDiasController } from './controllers/rutina-dias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RutinaDias } from './entities/rutinaDias.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RutinaDias])],
  providers: [RutinaDiasService],
  controllers: [RutinaDiasController]
})
export class RutinaDiasModule {}
