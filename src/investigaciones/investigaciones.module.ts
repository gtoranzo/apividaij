import { Module } from '@nestjs/common';
import { InvestigacionesService } from './investigaciones.service';
import { InvestigacionesController } from './investigaciones.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [InvestigacionesController],
  providers: [InvestigacionesService, PrismaService],
  exports: [InvestigacionesService],
})
export class InvestigacionesModule {}
