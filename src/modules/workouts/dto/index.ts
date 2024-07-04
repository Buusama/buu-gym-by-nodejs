import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { TypeEnumLabel } from '../../../commons/enums/sort/type-enum';
import { PageDto } from '../../../modules/pagination/dto/page.dto';

export class GetListWorkoutsDto extends PageDto {
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

export class CreateWorkoutDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  name: string;
}
