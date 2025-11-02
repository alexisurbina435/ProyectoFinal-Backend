import { Equals, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Matches, ValidateIf } from "class-validator"

export class CreateRegistroDto {

    @IsNotEmpty()
    @IsString()
    nombre: string

    @IsNotEmpty()
    @IsString()
    apellido: string

    @IsNotEmpty()
    @IsEmail()
    @Matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, { message: 'El correo no es válido' })
    email: string

    @IsNotEmpty()
    @IsNumber()
    @Matches( /^(\+54 )?\d{3,4} \d{6}$/, { message: 'El número de teléfono no es válido' })
    @IsPhoneNumber('AR', { message: 'El número de teléfono no es válido' })
    telefono: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    @ValidateIf(o => o.password)
    @Equals('password', { message: 'Las contraseñas no coinciden' })
    confirmPassword: string
}
