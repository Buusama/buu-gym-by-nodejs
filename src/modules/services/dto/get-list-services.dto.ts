import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TypeEnumLabel } from '../../../commons/enums/sort/type-enum';
import { PageDto } from '../../../modules/pagination/dto/page.dto';

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

  @ApiProperty({ required: false, type: 'number' })
  @Transform(({ value }) => {
    if (!Array.isArray(value)) {
      value = [value];
    }
    return value.map((v) => parseInt(v));
  })
  @IsNumber({}, { each: true })
  @IsOptional()
  categories: number;

  @ApiProperty({ required: false, type: [Number] })
  @Transform(({ value }) => value.map((v) => parseInt(v)))
  @IsNumber({}, { each: true })
  @IsArray()
  @IsOptional()
  rangePrices: number[];

  @ApiProperty({ required: false })
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  durationTime: number;

  @ApiProperty({ required: false, type: [Number] })
  @Transform(({ value }) => value.map((v) => parseInt(v)))
  @IsNumber({}, { each: true })
  @IsArray()
  @IsOptional()
  trainers: number[];

  @ApiProperty({ required: false })
  @Transform(({ value }) => {
    if (!Array.isArray(value)) {
      value = [value];
    }
    return value.map((v) => parseInt(v));
  })
  @IsNumber({}, { each: true })
  @IsArray()
  @IsOptional()
  workouts: number[];
}
