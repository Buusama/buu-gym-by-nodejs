import { PageDto } from '../../../modules/pagination/dto/page.dto';

export class GetListUsersDto extends PageDto {
  search: string;
}
