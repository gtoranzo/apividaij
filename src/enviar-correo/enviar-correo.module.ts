import { Module } from '@nestjs/common';
import { EnviarCorreoService } from './enviar-correo.service';
import { EnviarCorreoController } from './enviar-correo.controller';

@Module({
  controllers: [EnviarCorreoController],
  providers: [EnviarCorreoService]
})
export class EnviarCorreoModule {}
