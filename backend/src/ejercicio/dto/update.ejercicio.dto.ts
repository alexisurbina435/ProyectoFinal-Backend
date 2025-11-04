import { PartialType } from '@nestjs/mapped-types';
import { CreateEjercicioDto } from './create.ejercico.dto';

export class UpdateDiaDto extends PartialType(CreateEjercicioDto) {}
