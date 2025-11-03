import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Dificultad } from "src/dificultad/entities/dificultad.entity";

@Entity('ejercicio')
export class Ejercicio {

  @PrimaryGeneratedColumn()
  id_ejercicio: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 255 })
  detalle: string;

  @Column({ nullable: true })
  img_url: string;

  @Column({ nullable: true })
  video_url: string;

  @OneToMany(() => Dificultad, dificultad => dificultad.ejercicio)
  dificultades: Dificultad[];
}