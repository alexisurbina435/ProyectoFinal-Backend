import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsuarioDto } from '../dto/create.usuario.dto';
import { UsuarioDto } from '../dto';
import { error } from 'console';
import { UpdateUsuarioDto } from '../dto/update.usuario.dto';



@Injectable()
export class UsuarioService {


    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>
    ){}


    async getAllUsuario(): Promise <UsuarioDto[]>{
        const usuario: UsuarioDto[] = await this.usuarioRepository.find();
        return usuario;
    }

    async getUsuarioById(id: number):Promise <UsuarioDto | null>{
       const usuario = await this.usuarioRepository.findOne({where: {id_usuario:id }});
        return usuario;   
       //    {if(!usuario) return null}


    //     const usuarioDto: UsuarioDto={
    //         id_usuario:usuario.id_usuario,
    //         nombre:usuario.nombre,
    //         apellido:usuario.apellido,
    //         dni:usuario.dni,
    //         telefono:usuario.telefono,
    //         correo:usuario.correo,
    //         estado_pago:usuario.estado_pago


    //     };

    //     return usuarioDto;  
    //    }

    }


    async postUsuario(CreateUsuarioDto: CreateUsuarioDto): Promise <UsuarioDto>{
        try{
        const newUsuario = this.usuarioRepository.create(CreateUsuarioDto);
        const usuario = await this.usuarioRepository.save(newUsuario);
        return usuario;
        }catch(ex){
            throw new InternalServerErrorException(ex.message)
        }
}


   
      async putUsuario(id:number, updateUsuarioDto:UpdateUsuarioDto): Promise <UsuarioDto | null>{
        const rutina =this.usuarioRepository.create(updateUsuarioDto);
        const result = await  this.usuarioRepository.update({id_usuario: id}, rutina)
        if(!result.affected) {
         return null;
         } 
         return await this.getUsuarioById(id)
           }
   

        async deleteUsuario(id_usuario:number ): Promise<boolean> {
            const result = await this.usuarioRepository.delete({id_usuario});
            return (result.affected ?? 0) > 0;
        }




}
