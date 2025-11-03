import { Entity,PrimaryGeneratedColumn,Column,ManyToOne, } from "typeorm";
import { Venta } from "src/venta/entities/venta.entity";
import { Producto } from "src/productos/entities/producto.entity";

@Entity('detalle_venta')
export class DetalleVenta {
  @PrimaryGeneratedColumn()
  id_detalle: number;

  @ManyToOne(() => Venta, (venta) => venta.detalles)
  venta: Venta;

  @ManyToOne(() => Producto)
  producto: Producto;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'float' })
  subtotal: number; // producto.precio * cantidad
}