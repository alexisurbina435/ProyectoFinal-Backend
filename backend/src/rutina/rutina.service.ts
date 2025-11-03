import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rutina } from './entities/rutina.entity';
import { Repository } from 'typeorm';
import { CreateRutinaDto, RutinaDto, UpdateRutinaDto } from './dto';


@Injectable()
export class RutinaService {

    constructor(
        @InjectRepository(Rutina)
        private rutinaRepository: Repository<Rutina>
    ){}


    async getAllRutinas(): Promise<RutinaDto[]>{
        const rutina :RutinaDto[] = await this.rutinaRepository.find();
        return rutina;
    }


    async getRutinaById(id: number): Promise<RutinaDto | null > {
        const rutina  = await this.rutinaRepository.findOne({where: {id_rutina: id } });

        return rutina;
    }

        async postRutina(createRutinaDto:CreateRutinaDto): Promise <RutinaDto>{
            const newRutina = this.rutinaRepository.create(createRutinaDto);
            const rutina = await this.rutinaRepository.save(newRutina);
            return rutina;

        }





        async putRutina(id:number, updateRutinaDto:UpdateRutinaDto): Promise <RutinaDto | null>{
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
    



