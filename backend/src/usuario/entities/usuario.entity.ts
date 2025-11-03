import { Column, Entity,PrimaryGeneratedColumn,OneToMany } from "typeorm";
import { Rutina } from "src/rutina/entities/rutina.entity";
import { Venta } from "src/venta/entities/venta.entity";


export enum Rol {
    USUARIO ='Usuario',
    ADMIN ='Admin'
}

export enum tipoPlan {
    BASIC='Basic',
    MEDIUM='Medium',
    PREMIUM='Premium'
}



@Entity('usuario')
export class Usuario {

    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column({type:'varchar', length:45, nullable:true})
    nombre:string;

    @Column({type:'varchar', length:45, nullable:true})
    apellido:string;

     @Column({type:'int',nullable:true})
    dni:number;

    @Column({type:'varchar', length:255, nullable:true})
    correo:string;

    @Column({type:'int', nullable:true})
    telefono:number;

    @Column({type:'enum', enum:Rol , default: Rol.USUARIO })
    rol : Rol


    @Column({ type:'enum', enum:tipoPlan,default:tipoPlan.BASIC })
    tipoPlan: tipoPlan;
    
    @Column({type:'boolean', default:false})
    estado_pago:boolean;

    
      // RELACIÓN → Un usuario puede tener muchas rutinas
    @OneToMany(() => Rutina, rutina => rutina.usuario)
    rutinas: Rutina[];

    // Un usuario puede tener muchas ventas
    @OneToMany(() => Venta, (venta) => venta.usuario)
    ventas: Venta[];



}