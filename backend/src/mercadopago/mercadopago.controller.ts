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
  async webhook(@Body() body: any, @Headers() headers: any) {
    console.log('Webhook recibido:', body);

    // Consumir la variable de entorno
    const secret = process.env.WEBHOOK_SECRET;
    console.log('Clave secreta cargada desde env:', secret);

    // Ejemplo: podrías validar un header contra tu clave secreta
    const signature = headers['x-signature'];
    if (secret && signature !== secret) {
      console.warn('Webhook rechazado: firma inválida');
      return { received: false };
    }

    if (body.type === 'preapproval') {
      const preapprovalId = body.data.id;
      const status = body.data.status;
      await this.suscripcionService.actualizarEstado(preapprovalId, status);
    }

    return { received: true };
  }

}

