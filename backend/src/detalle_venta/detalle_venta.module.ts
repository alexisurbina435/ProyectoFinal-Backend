import { Module } from '@nestjs/common';
import { DetalleVentaService } from './services/detalle-venta.service';
import { DetalleVentaController } from './controllers/detalle-venta.controller';

@Module({
  providers: [DetalleVentaService],
  controllers: [DetalleVentaController]
})
export class DetalleVentaModule {}
