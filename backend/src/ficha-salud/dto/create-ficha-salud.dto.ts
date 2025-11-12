import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, Length, ValidateIf } from "class-validator";
import { Sexo, TipoClase } from "../entities/ficha-salud.entity";
import { Unique } from "typeorm";
import { Type } from "class-transformer";

export class CreateFichaSaludDto {

        @IsNumber()
        @IsNotEmpty()
        @IsPositive()
        dni: number;

        @IsNotEmpty()
        @IsDate()
        @Type(() => Date)
        fechaNacimiento: Date;

        @IsNotEmpty()
        @IsString()
        @Length(3, 50, { message: 'La direccion debe tener entre 5 y 50 caracteres' })
        direccion: string;

        @IsNotEmpty()
        @IsString()
        @Length(3, 50, { message: 'La ciudad debe tener entre 5 y 50 caracteres' })
        ciudad: string;

        @IsNotEmpty()
        @IsString()
        @Length(3, 50, { message: 'La provincia debe tener entre 5 y 50 caracteres' })
        provincia: string;

        @IsNumber()
        @IsNotEmpty()
        @IsPositive()
        codigoPostal: number;

        @IsNotEmpty()
        @IsString()
        @Length(3, 50, { message: 'El pais debe tener entre 5 y 50 caracteres' })
        pais: string;

        @IsNotEmpty()
        @IsEnum(Sexo)
        sexo: Sexo;

        @IsNotEmpty()
        @IsEnum(TipoClase)
        clase: TipoClase;
        
        @IsBoolean()
        @IsNotEmpty()
        condicion: boolean;
        
        @IsString()
        @ValidateIf((objeto) => objeto.condicon === true)
        @Length(10, 200, { message: 'La lesion debe tener entre 2 y 200 caracteres' })
        @IsNotEmpty()
        lesion: string;

        @IsBoolean()
        @IsNotEmpty()
        medicacion: boolean;

        @IsString()
        @ValidateIf((objeto) => objeto.medicacion === true)
        @Length(10, 200, { message: 'El medicamento debe tener entre 2 y 200 caracteres' })
        @IsNotEmpty()
        medicamento: string;

        @IsBoolean()
        @IsNotEmpty()
        expEntrenando: boolean;

        @IsNotEmpty()
        @IsString()
        @Length(10, 200, { message: 'El objetivo debe tener entre 2 y 200 caracteres' })
        objetivos: string;

        // el id del usuario va a ser unico por planilla 
        @Unique(['id_usuario'])
        id_usuario: number;
}
