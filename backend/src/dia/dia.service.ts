import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiaDto } from './dto/create-dia.dto';
import { UpdateDiaDto } from './dto/update-dia.dto';
import { Dia } from './entities/dia.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DiaService {
  constructor(
    @InjectRepository(Dia)
    private readonly diaRepo: Repository<Dia>,
  ) {}

  async create(createDiaDto: CreateDiaDto): Promise<Dia> {
    const newDia = this.diaRepo.create(createDiaDto);
    return this.diaRepo.save(newDia);
  }

  async findAll(): Promise<Dia[]> {
    return this.diaRepo.find();
  }

  async findOne(id: number): Promise<Dia> {
    const dia = await this.diaRepo.findOne({ where: { id_dia: id } });
    if (!dia) {
      throw new NotFoundException(`Dia con id ${id} no encontrado`);
    }
    return dia;
  }

  async update(id: number, updateDiaDto: UpdateDiaDto): Promise<Dia> {
    const existingDia = await this.findOne(id);
    this.diaRepo.merge(existingDia, updateDiaDto);
    return this.diaRepo.save(existingDia);
  }

  async remove(id: number): Promise<void> {
    const dia = await this.findOne(id);
    await this.diaRepo.remove(dia);
  }
}
  