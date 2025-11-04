import { Module } from '@nestjs/common';
import { DetalleVentaService } from './detalle-venta.service';
import { DetalleVentaController } from './detalle-venta.controller';
import { DetalleVenta } from './entities/detalleVenta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([DetalleVenta])],
  providers: [DetalleVentaService],
  controllers: [DetalleVentaController],
})
export class DetalleVentaModule {}
