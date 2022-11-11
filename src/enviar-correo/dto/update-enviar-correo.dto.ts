import { PartialType } from '@nestjs/swagger';
import { CreateEnviarCorreoDto } from './create-enviar-correo.dto';

export class UpdateEnviarCorreoDto extends PartialType(CreateEnviarCorreoDto) {}
