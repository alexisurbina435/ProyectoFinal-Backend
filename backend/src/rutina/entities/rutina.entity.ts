import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Semana } from "src/semana/entities/semana.entity";

@Entity('rutina')
export class Rutina {

  @PrimaryGeneratedColumn()
  id_rutina: number;

  @Column({ length: 255 })
  descripcion: string;

  @Column({ type: 'enum', enum: ['Basic', 'Medium', 'Premium'], default: 'Basic' })
  categoria: string;

  // RELACIÓN → Muchas Rutinas pertenecen a un Usuario
  @ManyToOne(() => Usuario, usuario => usuario.rutinas, { nullable: true })
  usuario: Usuario;

  @OneToMany(() => Semana, semana => semana.rutina)
  semanas: Semana[];
}