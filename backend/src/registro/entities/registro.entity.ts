// import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('registro')
export class Registro {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 30 })
    nombre: string

    @Column({ type: 'varchar', length: 30 })
    apellido: string

    @Column({ type: 'varchar', length: 30 })
    email: string

    @Column({ type: 'int' })
    telefono: number

    @Column({ type: 'varchar', length: 30 })
    password: string

    @CreateDateColumn({ type: 'timestamp' })
    fecha_creacion: Date;
}
