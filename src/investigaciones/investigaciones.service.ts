import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInvestigacioneDto } from './dto/create-investigacione.dto';
import { UpdateInvestigacioneDto } from './dto/update-investigacione.dto';

@Injectable()
export class InvestigacionesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInvestigacioneDto: CreateInvestigacioneDto) {
    try {
      return await this.prisma.investigaciones.create({
        data: createInvestigacioneDto,
      });
    } catch (error) {
      throw new HttpException(
        `Existe un error: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(pagination) {
    const total = await this.prisma.investigaciones.count();
    const totalPages = Math.ceil(total / pagination.rowsPerPage);

    if (totalPages < pagination.page) {
      pagination.page = pagination.page - 1;
    }
    let sk = pagination.rowsPerPage * (pagination.page - 1);
    if (sk < 0) {
      sk = 0;
    }

    const result = await this.prisma.investigaciones.findMany({
      skip: sk,
      take: pagination.rowsPerPage,
      include: {
        users: {
          select: {
            username: true,
            email: true,
          },
        },
        categorias: {
          select: {
            categoria: true,
          },
        },
      },
    });

    return {
      data: result,
      count: total,
    };
  }

  async d() {
    try {
      const getAllInves = await this.prisma.investigaciones.findMany({
        include: {
          users: {
            select: {
              username: true,
              email: true,
            },
          },
          categorias: {
            select: {
              categoria: true,
            },
          },
        },
      });
      if (getAllInves.length <= 0) {
        throw new NotFoundException('No existen registros');
      }
      return getAllInves;
    } catch (error) {
      throw new HttpException(
        `Existe un error: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number) {
    const founded = await this.prisma.investigaciones.findUnique({
      where: { id: id },
      include: {
        users: {
          select: {
            username: true,
            email: true,
          },
        },
        categorias: {
          select: {
            categoria: true,
          },
        },
      },
    });
    if (!founded) {
      throw new NotFoundException(`El recurso que busca no existe`);
    }
    return founded;
  }

  async update(id: number, updateInvestigacioneDto: UpdateInvestigacioneDto) {
    try {
      const founded = await this.findOne(id);
      const upd = await this.prisma.investigaciones.update({
        where: {
          id: founded.id,
        },
        data: updateInvestigacioneDto,
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
    return await this.prisma.investigaciones.delete({
      where: {
        id: founded.id,
      },
    });
  }
}
