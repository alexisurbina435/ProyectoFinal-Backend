/* eslint-disable prettier/prettier */
import { MediosDePago, EstadoPago } from "../entities/pago.entity";

export class UpdatePagoDto {
  medioDePago?: MediosDePago;
  monto?: number;
  estado?: EstadoPago;
}