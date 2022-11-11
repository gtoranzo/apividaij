import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class CreateInvestigacioneDto {
  id: number;
  titulo: string;
  autor: string;
  resumen: string;
  @Type(() => Date)
  @IsDate()
  fecha: Date;
  categoria_id: number;
  user_id: number;
  file_url: string;
  file_name: string;
}
