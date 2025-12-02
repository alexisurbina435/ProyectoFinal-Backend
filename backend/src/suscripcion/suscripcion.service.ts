import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { MercadoPagoService } from '../mercadopago/mercadopago.service';
import { CreateSuscripcionDto } from './dto/create-suscripcion.dto';
import { Suscripcion } from './entities/suscripcion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Plan } from '../plan/entities/plan.entity';

@Injectable()
export class SuscripcionService {
  constructor(
    private readonly mpService: MercadoPagoService,
    @InjectRepository(Suscripcion)
    private readonly suscripcionRepository: Repository<Suscripcion>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Plan)
    private readonly planRepo: Repository<Plan>,
  ) { }

  async crear(dto: CreateSuscripcionDto) {
    console.log('DTO recibido en crear():', dto);

    try {
      // 1. Buscar usuario
      console.log('Buscando usuario con ID:', dto.id_usuario);
      const usuario = await this.usuarioRepo.findOne({ where: { id_usuario: dto.id_usuario } });
      if (!usuario) {
        console.error('Usuario no encontrado');
        throw new NotFoundException('Usuario no encontrado');
      }
      console.log('Usuario encontrado:', usuario);

      // 2. Buscar plan
      console.log('Buscando plan con ID:', dto.id_plan);
      const plan = await this.planRepo.findOne({ where: { id_plan: dto.id_plan } });
      if (!plan) {
        console.error('Plan no encontrado');
        throw new NotFoundException('Plan no encontrado');
      }
      console.log('Plan encontrado:', plan);

      // 3. Validar meses contratados
      if (!dto.mesesContratados || dto.mesesContratados <= 0) {
        console.error('Meses contratados inválido:', dto.mesesContratados);
        throw new BadRequestException('Debes indicar meses contratados mayor a 0');
      }
      console.log('Meses contratados:', dto.mesesContratados);

      // 4. Crear suscripción en MercadoPago
      let mp;
      try {
        mp = await this.mpService.crearSuscripcion(usuario.email, plan.precio, plan.nombre);
        console.log('Respuesta de MercadoPago:', mp);
      } catch (e) {
        console.error('Error en mpService.crearSuscripcion:', e);
        throw new InternalServerErrorException('Error al crear suscripción en MercadoPago');
      }

      // 5. Crear objeto Suscripcion
      const suscripcion = this.suscripcionRepository.create({
        usuario,
        plan,
        fechaInicio: null,
        fechaFin: null,
        mesesContratados: dto.mesesContratados,
        montoPagado: 0,
        estado: 'Pendiente',
        preapprovalId: mp.id,
      });
      console.log('Suscripción a guardar:', suscripcion);

      // 6. Guardar en DB
      try {
        await this.suscripcionRepository.save(suscripcion);
        console.log('Suscripción guardada correctamente');
      } catch (e) {
        console.error('Error al guardar suscripción en DB:', e);
        throw new InternalServerErrorException('Error al guardar suscripción en base de datos');
      }

      // 7. Devolver respuesta
      return mp;

    } catch (error) {
      console.error('Error general en crear():', error);
      throw new InternalServerErrorException('No se pudo crear la suscripción');
    }
  }



  async procesarWebhook(preapprovalId: string, status: string) {
    const suscripcion = await this.suscripcionRepository.findOne({ where: { preapprovalId }, relations: ['usuario', 'plan'] });
    if (!suscripcion) return;

    if (status === 'authorized') {
      suscripcion.estado = 'Activa';
      suscripcion.fechaInicio = new Date();
      suscripcion.fechaFin = new Date();
      suscripcion.fechaFin.setMonth(suscripcion.fechaInicio.getMonth() + suscripcion.mesesContratados);
      suscripcion.montoPagado = suscripcion.plan.precio * suscripcion.mesesContratados;
      await this.suscripcionRepository.save(suscripcion);

      suscripcion.usuario.estado_pago = true;
      await this.usuarioRepo.save(suscripcion.usuario);
    }

    if (status === 'cancelled') {
      suscripcion.estado = 'Cancelada';
      await this.suscripcionRepository.save(suscripcion);

      suscripcion.usuario.estado_pago = false;
      await this.usuarioRepo.save(suscripcion.usuario);
    }
  }


  async cancelar(preapprovalId: string) {
    await this.mpService.cancelarSuscripcion(preapprovalId);
    await this.suscripcionRepository.update({ preapprovalId }, { estado: 'CANCELADA' });
  }

  async actualizarEstado(preapprovalId: string, estado: string) {

    const suscripcion = await this.suscripcionRepository.findOne({
      where: { preapprovalId },
      relations: ['usuario'],
    });


    if (!suscripcion) {
      console.log('No se encontró la suscripción con preapprovalId:', preapprovalId);
      return;
    }

    suscripcion.estado = estado.toUpperCase();
    await this.suscripcionRepository.save(suscripcion);


    const estadoActivo = ['authorized', 'approved', 'active'];
    if (estadoActivo.includes(estado)) {
      suscripcion.usuario.estado_pago = true;
      await this.usuarioRepo.save(suscripcion.usuario);
    }

    console.log('Suscripcion encontrada:', suscripcion);
    console.log('Usuario relacionado:', suscripcion?.usuario);
    console.log('Estado recibido:', estado);
    if (estado === 'cancelled') {
      suscripcion.usuario.estado_pago = false;
      await this.usuarioRepo.save(suscripcion.usuario);
    }
  }

  async cambiarPlan(id_usuario: number, id_plan_nuevo: number, mesesContratados: number) {

    const usuario = await this.usuarioRepo.findOne({ where: { id_usuario } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');


    const suscripcionActual = await this.suscripcionRepository.findOne({
      where: { usuario: { id_usuario }, estado: 'Activa' },
      relations: ['plan', 'usuario'],
    });
    if (!suscripcionActual) throw new NotFoundException('No se encontró suscripción activa');

    //Cancela suscripcion en mercado pago
    await this.mpService.cancelarSuscripcion(suscripcionActual.preapprovalId);
    suscripcionActual.estado = 'CANCELADA';
    await this.suscripcionRepository.save(suscripcionActual);

    //Buscar nuevo plan
    const planNuevo = await this.planRepo.findOne({ where: { id_plan: id_plan_nuevo } });
    if (!planNuevo) throw new NotFoundException('Plan nuevo no encontrado');

    //Crear nueva suscripción en MP
    const mp = await this.mpService.crearSuscripcion(usuario.email, planNuevo.precio, planNuevo.nombre);

    //Crear registro en DB
    const fechaInicio = new Date();
    const fechaFin = new Date();
    fechaFin.setMonth(fechaFin.getMonth() + mesesContratados);

    const nuevaSuscripcion = this.suscripcionRepository.create({
      usuario,
      plan: planNuevo,
      fechaInicio,
      fechaFin,
      mesesContratados,
      montoPagado: planNuevo.precio * mesesContratados,
      estado: 'Activa',
      preapprovalId: mp.id,
    });

    await this.suscripcionRepository.save(nuevaSuscripcion);

    usuario.estado_pago = true;
    await this.usuarioRepo.save(usuario);

    return {
      message: 'Plan cambiado correctamente',
      init_point: mp.init_point,
      preapprovalId: mp.id,
    };
  }


}
