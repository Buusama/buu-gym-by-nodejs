import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { TypeEnumLabel } from '../../../commons/enums/sort/type-enum';
import { PageDto } from '../../../modules/pagination/dto/page.dto';

export class GetListMembershipPlansDto extends PageDto {
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
