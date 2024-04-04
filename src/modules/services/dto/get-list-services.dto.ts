import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { TypeEnumLabel } from 'src/commons/enums/sort/type-enum';
import { PageDto } from 'src/modules/pagination/dto/page.dto';

export class GetListServicesDto extends PageDto {
  @ApiProperty({ required: false, type: 'number' })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  status: number;

  @ApiProperty({ required: false })
  field: string;

  @ApiProperty({ required: false, enum: TypeEnumLabel, type: 'string' })
  type: string;

  @ApiProperty({ required: false })
  value: string;
}
