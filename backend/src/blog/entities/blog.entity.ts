import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Blog {



    @PrimaryGeneratedColumn()
    id_blog:number;

    @Column({type:'varchar', length:255, default:true})
    imagen:string;


    @Column({type:'varchar', length:50,nullable:true})
    categoria:string;

    @Column({type:"varchar",length:50})
    titulo:string;


    @Column({type:'varchar', length:100})
    glosario:string;


    @Column({type:'text',nullable:true})
    contenido:string;


    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    fecha_publicacion: Date;

}