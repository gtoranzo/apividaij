import { IsNotEmpty } from 'class-validator';

export class CreateCategoriaDto {
  id: number;
  @IsNotEmpty()
  categoria: string;
}
