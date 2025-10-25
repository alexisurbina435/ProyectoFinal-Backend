import { Module } from '@nestjs/common';
import { AdministradorService } from './services/administrador.service';
import { AdministradorController } from './controllers/administrador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrador } from './entities/administrador.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Administrador])],
  controllers: [AdministradorController],
  providers: [AdministradorService],
})
export class AdministradorModule {}
