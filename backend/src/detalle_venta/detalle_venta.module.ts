import { Module } from '@nestjs/common';
import { DetalleVentaService } from './detalle-venta.service';
import { DetalleVentaController } from './detalle-venta.controller';

@Module({
  providers: [DetalleVentaService],
  controllers: [DetalleVentaController]
})
export class DetalleVentaModule {}
