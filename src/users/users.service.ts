import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await genSalt(10);
    createUserDto.password = await hash(createUserDto.password, salt);

    const res = await this.prisma.users.create({
      data: createUserDto,
    });
    return res;
  }

  async findAll() {
    return await this.prisma.users.findMany({
      include: {
        roles: true,
      },
    });
  }

  async findOne(id: number) {
    const founded = await this.prisma.users.findFirst({
      where: {
        id: id,
      },
      include: {
        roles: true,
      },
    });

    if (!founded)
      throw new NotFoundException(`El elemento no existe en la base de datos.`);

    return founded;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const founded = await this.findOne(id);

    if (updateUserDto.password) {
      const salt = await genSalt(10);
      const hashed = await hash(updateUserDto.password, salt);
      updateUserDto.password = hashed;
    }

    return await this.prisma.users.update({
      where: {
        id: founded.id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    const founded = await this.findOne(id);

    return await this.prisma.users.delete({
      where: {
        id: founded.id,
      },
    });
  }

  async findUsername(username: string) {
    return await this.prisma.users.findFirst({
      where: {
        username: username,
      },
      include: {
        roles: true,
      },
    });
  }
}
