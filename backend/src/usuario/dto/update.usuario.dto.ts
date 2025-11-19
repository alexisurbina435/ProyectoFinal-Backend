import { Rol } from "../entities/usuario.entity";
import { tipoPlan } from "../entities/usuario.entity";

export class UpdateUsuarioDto {
       id_usuario?:number;
       nombre?:string;
       apellido?:string;
       dni?:number;
       telefono?:string;
       correo?:string;
       rol?: Rol;
       estado_pago?:boolean;
       tipoPlan?: tipoPlan;
}