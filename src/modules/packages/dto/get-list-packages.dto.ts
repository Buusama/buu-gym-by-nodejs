import { PageDto } from 'src/modules/pagination/dto/page.dto';

export class GetListPackagesDto extends PageDto {
  search: string;
}
