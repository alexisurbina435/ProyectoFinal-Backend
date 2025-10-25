export class CreateUsuarioDto {
    nombre:string;
    dni:number;
    apellido:string;
    correo:string;
    telefono:number;
    estado_pago?:boolean;
}