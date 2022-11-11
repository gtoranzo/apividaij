import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      return await this.prisma.categorias.create({ data: createCategoriaDto });
    } catch (error) {
      throw new HttpException(
        `Existe un error: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const getAllCategorias = await this.prisma.categorias.findMany();
      if (getAllCategorias.length <= 0) {
        throw new NotFoundException('No existen registros');
      }
      return getAllCategorias;
    } catch (error) {
      throw new HttpException(
        `Existe un error: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number) {
    const founded = await this.prisma.categorias.findUnique({
      where: { id: id },
    });
    if (!founded) {
      throw new NotFoundException(`El recurso que busca no existe`);
    }
    return founded;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    try {
      const founded = await this.findOne(id);
      const upd = await this.prisma.categorias.update({
        where: {
          id: founded.id,
        },
        data: updateCategoriaDto,
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
    return await this.prisma.categorias.delete({
      where: {
        id: founded.id,
      },
    });
  }
}
