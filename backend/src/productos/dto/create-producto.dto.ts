import { IsNotEmpty, IsNumber, IsPositive, IsString, Length } from "class-validator";

export class CreateProductoDto {
        
        @IsNotEmpty()
        @IsString()
        @Length(3, 30, { message: 'El nombre debe tener entre 3 y 30 caracteres' })
        nombre:string;
        
        @IsNotEmpty()
        @IsString()
        @Length(3, 100, { message: 'La descripcion debe tener entre 3 y 100 caracteres' })
        descripcion:string;
        
        @IsNotEmpty()
        @IsString()
        imagen:string;
        
        @IsNotEmpty()
        @IsNumber()
        @IsPositive()
        precio:number;
        
        @IsNotEmpty()
        @IsNumber()
        @IsPositive()
        stock:number;

        @IsNotEmpty()
        @IsString()
        categoria:string



}  
