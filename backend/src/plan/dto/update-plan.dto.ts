import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanDto } from './create-plan.dto';

export class UpdateProductoDto extends PartialType(CreatePlanDto) {}
