import { Module } from '@nestjs/common';
import { DiaService } from './dia.service';
import { DiaController } from './dia.controller';
import { Dia } from './entities/dia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Dia])],
  controllers: [DiaController],
  providers: [DiaService],
})
export class DiaModule {}
