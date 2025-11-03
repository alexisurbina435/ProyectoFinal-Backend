import { Injectable } from '@nestjs/common';
import { CreateDificultadDto } from './dto/create-dificultad.dto';
import { UpdateDificultadDto } from './dto/update-dificultad.dto';

@Injectable()
export class DificultadService {
  create(createDificultadDto: CreateDificultadDto) {
    return 'This action adds a new dificultad';
  }

  findAll() {
    return `This action returns all dificultad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dificultad`;
  }

  update(id: number, updateDificultadDto: UpdateDificultadDto) {
    return `This action updates a #${id} dificultad`;
  }

  remove(id: number) {
    return `This action removes a #${id} dificultad`;
  }
}
