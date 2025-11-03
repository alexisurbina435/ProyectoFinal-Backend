import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Ejercicio } from "src/ejercicio/entities/ejercicio.entity";
import { Dia } from "src/dia/entities/dia.entity";

@Entity('dificultad')
export class Dificultad {

  @PrimaryGeneratedColumn()
  id_dificultad: number;

  @Column()
  peso: number;

  @Column()
  repeticiones: number;

  @ManyToOne(() => Dia, dia => dia.dificultades)
  dia: Dia;

  @ManyToOne(() => Ejercicio, ejercicio => ejercicio.dificultades)
  ejercicio: Ejercicio;
}