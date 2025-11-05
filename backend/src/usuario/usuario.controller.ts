import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  InternalServerErrorException,
  Param,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UpdateUsuarioDto } from './dto/update.usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Controller('usuario')
export class UsuarioController {
  constructor(private UsuarioService: UsuarioService) {}

  @Get()
  async getAllUsuarios() {
    const usuario = await this.UsuarioService.getAllUsuario();
    return usuario;
  }

  @Get(':id')
  async getUsuarioById(@Param() params) {
    const id = params.id;
    const usuario = await this.UsuarioService.getUsuarioById(id);
    if (!usuario) {
      throw new InternalServerErrorException(' El usuario no existe');
    }
    return usuario;
  }

  @Post()
  async postUsuario(@Body() createUsuarioDto: Usuario): Promise<Usuario> {
    const usuario: Usuario =
      await this.UsuarioService.postUsuario(createUsuarioDto);
    return usuario;
  }

  @Put(':id')
  async putUsuario(
    @Param('id') id_usuario,
    @Body() UpdateUsuarioDto: UpdateUsuarioDto,
  ) {
    const rutina = await this.UsuarioService.putUsuario(
      id_usuario,
      UpdateUsuarioDto,
    );
    if (!rutina) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return rutina;
  }

  @Delete(':id')
  async deleteUsuario(@Param('id') id_usuario) {
    const result = await this.UsuarioService.deleteUsuario(id_usuario);
    if (result) {
      return null;
    }
    throw new NotFoundException('usuario no encontrado.');
  }
}
