import { Injectable } from '@nestjs/common';
import { CreateEnviarCorreoDto } from './dto/create-enviar-correo.dto';
import { UpdateEnviarCorreoDto } from './dto/update-enviar-correo.dto';
//import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnviarCorreoService {
  //constructor(private readonly prisma: PrismaService) {}

  async create(createEnviarCorreoDto: CreateEnviarCorreoDto) {
    /*return this.prisma.sendMail.create({
      data: createCargoMilitarDto,
    });*/
    return 'This action adds a new enviarCorreo';
  }

  findAll() {
    return `This action returns all enviarCorreo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} enviarCorreo`;
  }

  update(id: number, updateEnviarCorreoDto: UpdateEnviarCorreoDto) {
    return `This action updates a #${id} enviarCorreo`;
  }

  remove(id: number) {
    return `This action removes a #${id} enviarCorreo`;
  }
}
