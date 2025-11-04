/* eslint-disable prettier/prettier */

import { IsEnum, IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { MediosDePago, EstadoPago } from "../entities/pago.entity";


export class CreatePagoDto {
  @IsEnum(MediosDePago)
  @IsNotEmpty()
  medioDePago: MediosDePago;

  @IsNumber()
  @IsPositive()
  monto: number;

  @IsEnum(EstadoPago)
  estado?: EstadoPago;

  // Relación con venta
  // @IsNumber()
  // @IsNotEmpty()
  // ventaId: number;
}