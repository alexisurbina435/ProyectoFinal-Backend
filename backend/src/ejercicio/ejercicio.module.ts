import { Module } from '@nestjs/common';
import { EjercicioService } from './services/ejercicio.service';

@Module({
  providers: [EjercicioService]
})
export class EjercicioModule {}
