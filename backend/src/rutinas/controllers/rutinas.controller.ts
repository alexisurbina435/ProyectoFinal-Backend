import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, Post, Put, Delete } from '@nestjs/common';
import { RutinasService } from '../services/rutinas.service';
import { CreateRutinaDto, UpdateRutinaDto } from '../dto';


@Controller('rutinas')
export class RutinasController {
    

    constructor(private RutinasService: RutinasService){}


    @Get()
    async getAllRutinas(){
        const rutinas = await this.RutinasService.getAllRutinas();
        return rutinas;
    }

    @Get(':id')
    async getRutinaById(@Param('id') id: string){
        const rutina = await this.RutinasService.getRutinaById(Number(id));
        if (!rutina) {
            throw new NotFoundException('Rutina no encontrada.');
        }
        return rutina;
    }


    @Post()
    async postRutina(@Body()createRutinaDto: CreateRutinaDto){        
        try{
        const rutina = await this.RutinasService.postRutina(createRutinaDto); 
        return rutina
    }catch (ex) {
            throw new InternalServerErrorException(ex.message);
        }
}


    @Put(':id')
    async putRutina(@Param ('id') id_rutina, @Body() UpdateRutinaDto: UpdateRutinaDto){
        const rutina = await this.RutinasService.putRutina(id_rutina,UpdateRutinaDto);
        if(!rutina){
            throw new NotFoundException('Rutina no encontrada.');
        }
        return rutina;
    }

    @Delete(':id')
    async deleteRutina(@Param ('id') id_rutina ){
        const result = await this.RutinasService.deleteRutina(id_rutina)
        if(result){
            return null;
        }
        throw new NotFoundException('Rutina no encontrada.');
    }
}
   


