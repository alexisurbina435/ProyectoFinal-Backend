import { Body, Controller, HttpCode, Post, Headers } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';
import { SuscripcionService } from '../suscripcion/suscripcion.service';

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
  @HttpCode(200)
  async webhook(@Body() body: any) {
    console.log('Webhook recibido:', JSON.stringify(body, null, 2));

    const type = body.type || body.topic;
    const preapprovalId = body.data?.id;

    if (type === 'preapproval' || type === 'subscription_preapproval') {

      const detalle = await this.mpService.obtenerPreapproval(preapprovalId);
      const status = detalle.status;

      console.log("Estado real:", status);

      await this.suscripcionService.actualizarEstado(preapprovalId, status);
    }

    return { received: true };
  }


}

