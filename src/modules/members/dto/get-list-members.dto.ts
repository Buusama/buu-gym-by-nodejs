import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { MemberStatusValue } from 'src/commons/enums/members/member-status';
import { TypeEnumLabel } from 'src/commons/enums/sort/type-enum';
import { PageDto } from 'src/modules/pagination/dto/page.dto';
export class GetListMembersDto extends PageDto {
  @ApiProperty({ required: false, enum: MemberStatusValue, type: 'number' })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsEnum(MemberStatusValue)
  status: number;

  @ApiProperty({ required: false })
  field: string;

  @ApiProperty({ required: false, enum: TypeEnumLabel, type: 'string' })
  type: string;

  @ApiProperty({ required: false })
  value: string;
}
