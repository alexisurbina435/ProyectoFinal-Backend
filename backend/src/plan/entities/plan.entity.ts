import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity('plan')
export class Plan {

    @PrimaryGeneratedColumn({name:'id_plan', type:'int'})
    id_plan:number;


    @Column({name:'nombre', type:'enum',enum:['basic','standard','premium'], nullable:true })
    nombre: 'basic'| 'standard' | 'premium'| null;

    @Column({name:'precio', type:'int', nullable:true})
    precio:number;

    @Column({name:'descripcion', type:'varchar', length:45, nullable:true})
    descripcion: string | null;



 };