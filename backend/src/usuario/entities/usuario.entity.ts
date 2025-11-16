import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Rutina } from 'src/rutina/entities/rutina.entity';
import { Venta } from 'src/venta/entities/venta.entity';
import { Blog } from 'src/blog/entities/blog.entity';
import { FichaSalud } from 'src/ficha-salud/entities/ficha-salud.entity';

export enum Rol {
  USUARIO = 'Usuario',
  ADMIN = 'Admin',
}

export enum tipoPlan {
  BASIC = 'Basic',
  MEDIUM = 'Medium',
  PREMIUM = 'Premium',
}

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ type: 'varchar', length: 45 })
  nombre: string;

  @Column({ type: 'varchar', length: 45 })
  apellido: string;

  @Column({ type: 'int', unique: true, nullable: true })
  dni: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 20})
  telefono: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;

  @Column({ type: 'enum', enum: Rol, default: Rol.USUARIO })
  rol: Rol;

  @Column({ type: 'enum', enum: tipoPlan, nullable: true })
  tipoPlan: tipoPlan;

  @Column({ type: 'boolean', default: false })
  estado_pago: boolean;

  //Relación one to one con fichaSalud
  // la ficha es opcional, por que depende de que se inscriba a un plan el usuario
  @OneToOne(() => FichaSalud, (ficha) => ficha.usuario)
  ficha?: FichaSalud;

  // RELACIÓN → Un usuario puede tener muchas rutinas
  @OneToMany(() => Rutina, (rutina) => rutina.usuario, {
    cascade: true,
  })
  rutinas: Rutina[];

  // Un usuario puede tener muchas ventas
  @OneToMany(() => Venta, (venta) => venta.usuario)
  ventas: Venta[];

  // Un usuario puede tener muchos blogs
  @OneToMany(() => Blog, (blog) => blog.usuario)
  blogs: Blog[];
}
