import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { SortEnum } from '../../../commons/enums/sort/sort-enum';

export class PageDto {
  @ApiProperty({ required: false })
  public sort_enum: SortEnum;

  @ApiProperty({ required: false })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  @Min(0)
  public page: number;

  @ApiProperty({ required: false })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  @Min(1)
  public take: number;

  @ApiProperty({ required: false })
  @IsOptional()
  public sort_by?: string;
}
