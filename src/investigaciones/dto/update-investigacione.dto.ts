import { PartialType } from '@nestjs/swagger';
import { CreateInvestigacioneDto } from './create-investigacione.dto';

export class UpdateInvestigacioneDto extends PartialType(CreateInvestigacioneDto) {}
