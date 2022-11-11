import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EnviarCorreoService } from './enviar-correo.service';
import { CreateEnviarCorreoDto } from './dto/create-enviar-correo.dto';
import { UpdateEnviarCorreoDto } from './dto/update-enviar-correo.dto';

@Controller('enviar-correo')
export class EnviarCorreoController {
  constructor(private readonly enviarCorreoService: EnviarCorreoService) {}

  @Post()
  create(@Body() createEnviarCorreoDto: CreateEnviarCorreoDto) {
    return this.enviarCorreoService.create(createEnviarCorreoDto);
  }

  @Get()
  findAll() {
    return this.enviarCorreoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enviarCorreoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEnviarCorreoDto: UpdateEnviarCorreoDto,
  ) {
    return this.enviarCorreoService.update(+id, updateEnviarCorreoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enviarCorreoService.remove(+id);
  }
}
