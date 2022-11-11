import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { InvestigacionesService } from './investigaciones.service';
import { CreateInvestigacioneDto } from './dto/create-investigacione.dto';
import { UpdateInvestigacioneDto } from './dto/update-investigacione.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('investigaciones')
export class InvestigacionesController {
  constructor(
    private readonly investigacionesService: InvestigacionesService,
  ) {}

  @Post('/upload/')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/Investigaciones',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          req.body.user_id = parseInt(req.body.user_id);
          req.body.categoria_id = parseInt(req.body.categoria_id);
          req.body.fecha = new Date(req.body.fecha);
          req.body.file_url =
            './uploads/Investigaciones/' +
            `${randomName}${extname(file.originalname)}`;
          req.body.file_name = file.originalname;

          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @Post()
  create(@Body() createInvestigacioneDto: CreateInvestigacioneDto) {
    return this.investigacionesService.create(createInvestigacioneDto);
  }

  @Patch()
  findAll(@Query('pag') pag: number, @Body() pagination) {
    return this.investigacionesService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investigacionesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvestigacioneDto: UpdateInvestigacioneDto,
  ) {
    return this.investigacionesService.update(+id, updateInvestigacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investigacionesService.remove(+id);
  }
}
