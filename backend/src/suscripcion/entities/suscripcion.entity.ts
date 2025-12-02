import { Plan } from '../../plan/entities/plan.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, } from 'typeorm';


@Entity('suscripcion')
export class Suscripcion {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.suscripciones, { eager: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;

    @ManyToOne(() => Plan, (plan) => plan.suscripciones, { eager: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_plan' })
    plan: Plan;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    fechaInicio: Date | null;

    @Column({ type: 'timestamp', nullable: true })
    fechaFin: Date | null;


    @Column({ type: 'int', default: 1 })
    mesesContratados: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    montoPagado: number;

    @Column({ type: 'varchar', length: 20, default: 'ACTIVA' })
    estado: string;

    @Column()
    preapprovalId: string;

}