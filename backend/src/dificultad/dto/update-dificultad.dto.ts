import { PartialType } from '@nestjs/mapped-types';
import { CreateDificultadDto } from './create-dificultad.dto';

export class UpdateDificultadDto extends PartialType(CreateDificultadDto) {
    id_dificultad?: number;
    peso?: number;
    repeticiones?: number;

}
