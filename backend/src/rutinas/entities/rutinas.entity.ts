import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Usuario} from "src/usuario/entities/usuario.entity";
import { FichaSalud } from "src/ficha-salud/entities/fichaSalud-entity";
import { Administrador } from "src/administrador/entities/administrador.entity";

import { Plan } from "src/plan/entities/plan.entity";

@Entity('rutinas')
export class Rutinas{


    @PrimaryGeneratedColumn({name: 'id_rutina' ,type:'int'})
    id_rutina: number;

    @Column({type: 'int'})
    dia:number;


    @Column({type:'varchar', length: 45 })
    descripcion : string;


    @Column({type:'date'})
    fecha_creacion: Date;

    @Column({type: 'date'})
    fecha_vencimiento: Date;

    

     
}