import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriasModule } from './categorias/categorias.module';
import { InvestigacionesModule } from './investigaciones/investigaciones.module';
import { EnviarCorreoModule } from './enviar-correo/enviar-correo.module';

@Module({
  imports: [PrismaModule, RolesModule, UsersModule, AuthModule, CategoriasModule, InvestigacionesModule, EnviarCorreoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
