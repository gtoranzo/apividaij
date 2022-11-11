import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      return await this.prisma.roles.create({
        data: createRoleDto,
      });
    } catch (error) {
      throw new HttpException(
        `Existe un error: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const getAllRoles = await this.prisma.roles.findMany();
      if (getAllRoles.length <= 0) {
        throw new NotFoundException('No existen registros');
      }
      return getAllRoles;
    } catch (error) {
      throw new HttpException(
        `Existe un error: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number) {
    const founded = await this.prisma.roles.findUnique({
      where: { id: id },
    });
    if (!founded) {
      throw new NotFoundException(`El recurso que busca no existe`);
    }
    return founded;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const founded = await this.findOne(id);
      const upd = await this.prisma.roles.update({
        where: {
          id: founded.id,
        },
        data: updateRoleDto,
      });
      if (!upd.id) {
        throw new NotFoundException(`Error al actualizar`);
      }
      return upd;
    } catch (error) {
      throw new HttpException(
        `Existe un error: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    const founded = await this.findOne(id);
    return await this.prisma.roles.delete({
      where: {
        id: founded.id,
      },
    });
  }
}
