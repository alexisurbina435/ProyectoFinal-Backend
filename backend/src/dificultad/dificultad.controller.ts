import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DificultadService } from './dificultad.service';
import { CreateDificultadDto } from './dto/create-dificultad.dto';
import { UpdateDificultadDto } from './dto/update-dificultad.dto';

@Controller('dificultad')
export class DificultadController {
  constructor(private readonly dificultadService: DificultadService) {}

  @Post()
  create(@Body() createDificultadDto: CreateDificultadDto) {
    return this.dificultadService.create(createDificultadDto);
  }

  @Get()
  findAll() {
    return this.dificultadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dificultadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDificultadDto: UpdateDificultadDto) {
    return this.dificultadService.update(+id, updateDificultadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dificultadService.remove(+id);
  }
}
