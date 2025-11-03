import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Producto {


    @PrimaryGeneratedColumn()
    id_producto: number;


    @Column({type:'varchar', length:50})
    nombre:string;


    @Column({type:'text', length:50})
    descripcion:string;

    @Column({type:'varchar', length:255, nullable:true})
    imagen:string;

    @Column({type:'float'})
    precio:number;


    @Column({type:'int'})
    stock: number;




}
