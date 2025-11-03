import { Rol } from "../entities/usuario.entity";
import { tipoPlan } from "../entities/usuario.entity";

export class CreateUsuarioDto {
        nombre:string;
        apellido:string;
        dni:number;
        telefono:number;
        correo:string;
        rol: Rol;
        estado_pago:boolean;
        tipoPlan: tipoPlan;
}