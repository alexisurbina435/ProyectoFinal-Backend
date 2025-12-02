import { Body, Controller, HttpCode, Post, Headers, UnauthorizedException } from '@nestjs/common';
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
async webhook(@Body() body: any, @Headers('x-webhook-secret') secret: string) {
  if (secret !== process.env.WEBHOOK_SECRET) {
    throw new UnauthorizedException('Webhook no autorizado');
  }
  console.log("Webhook recibido:", body);
  if (body.type === 'preapproval') {
    await this.suscripcionService.procesarWebhook(body.data.id, body.data.status);
  }
  return { received: true };
}




}
