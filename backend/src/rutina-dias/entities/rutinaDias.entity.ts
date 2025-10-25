import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('rutinaDias')
export class RutinaDias {

     @PrimaryGeneratedColumn({name:'id_rutina_dias', type:'int'})
     id_rutina_dias:number;

    @Column({name:'dia', type:'int', default:null})
    dia:number;



    @Column({name:'semana', type:'int', default:null})
    semana:number;


    @Column({name:'zona_corporal', type:'varchar', length: 50, default: null})
    zona_corporal:string;



}