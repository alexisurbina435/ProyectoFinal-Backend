import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rutinas } from '../entities/rutinas.entity';
import { Repository } from 'typeorm';
import { CreateRutinaDto, RutinasDto, UpdateRutinaDto } from '../dto';

@Injectable()
export class RutinasService {

    constructor(
        @InjectRepository(Rutinas)
        private rutinaRepository: Repository<Rutinas>
    ){}


    async getAllRutinas(): Promise<RutinasDto[]>{
        const rutinas:RutinasDto[] = await this.rutinaRepository.find();
        return rutinas;
    }


    async getRutinaById(id: number): Promise<RutinasDto | null > {
        const rutina  = await this.rutinaRepository.findOne({where: {id_rutina: id } });
        
        {if(!rutina) return null};
        
        
        const rutinaDto:RutinasDto ={
            id_rutina:rutina.id_rutina,
            dia:rutina.dia,
            descripcion:rutina.descripcion,
            fecha_creacion:rutina.fecha_creacion,
            fecha_vencimiento:rutina.fecha_vencimiento,
        
        };
        
        
        
        return rutinaDto;
    }

        async postRutina(createRutinaDto:CreateRutinaDto): Promise <RutinasDto>{
            const newRutina = this.rutinaRepository.create(createRutinaDto);
            const rutina = await this.rutinaRepository.save(newRutina);
            return rutina;

        }





        async putRutina(id:number, updateRutinaDto:UpdateRutinaDto): Promise <RutinasDto | null>{
            const rutina =this.rutinaRepository.create(updateRutinaDto);
            const result = await  this.rutinaRepository.update({id_rutina: id}, rutina)
            if(!result.affected) {
                return null;
            } 
            return await this.getRutinaById(id)
        }


        async deleteRutina(id_rutina:number ): Promise<boolean> {
            const result = await this.rutinaRepository.delete({id_rutina});
            return (result.affected ?? 0) > 0;
        }


}
    



