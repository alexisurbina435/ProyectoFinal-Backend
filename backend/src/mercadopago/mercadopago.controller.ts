import { Body, Controller, HttpCode, Post, Headers, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';
import { SuscripcionService } from '../suscripcion/suscripcion.service';
import express from 'express';
@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mpService: MercadoPagoService,
    private readonly suscripcionService: SuscripcionService,
  ) { }

  @Post('crear-preferencia')
  async crearPreferencia() {
    return this.mpService.crearPreferencia();
  }

  // esto lo usa mercadopago cuando tengamos el dominio de la pag 
  @Post('webhook')
    @Get('webhook')
    async webhook(
        @Query('topic') topic: string,
        @Query('id') id: string, 
        @Res() res: express.Response 
    ) {
     
        res.sendStatus(HttpStatus.OK);
        
       
        if (!topic || !id) {
            console.error('Webhook: Falta topic o id. (Respuesta 200 ya enviada)');
            return; 
        }

        (async () => {
            console.log(`Webhook recibido: Topic=${topic}, ID=${id}`);

            if (topic === 'preapproval' || topic === 'subscription_preapproval') {
                try {
                    const detalle = await this.mpService.obtenerPreapproval(id);
                    const status = detalle.status;
                    
                    console.log("Estado real consultado:", status);

                    // Actualizar estado en tu DB
                    await this.suscripcionService.actualizarEstado(id, status);
                } catch (err) {
                    console.error('Error procesando preapproval (asíncrono):', err);
                }
            } 
      
        })();

      
    }
}


