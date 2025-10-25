import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";


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
    
    @Column({type:'boolean', default:false})
    estado_pago:boolean;

    






}