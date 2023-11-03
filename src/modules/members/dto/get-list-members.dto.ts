import { PageDto } from 'src/modules/pagination/dto/page.dto';

export class GetListMembersDto extends PageDto {
  search: string;
}
