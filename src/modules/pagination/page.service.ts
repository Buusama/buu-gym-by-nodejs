import { Repository, SelectQueryBuilder } from 'typeorm';
import { PageDto } from './dto/page.dto';
import { SortEnum } from 'src/commons/enums/sort/sort-enum';

export class PageService {
  protected paginate<T>(
    repository: Repository<T>,
    pageDto: PageDto,
    rawAndLeftJoin: boolean = false,
  ): SelectQueryBuilder<T> {
    const queryBuilder = repository.createQueryBuilder('table');

    if (pageDto.sort_by && pageDto.sort_enum) {
      queryBuilder.addOrderBy(`${pageDto.sort_by}`, pageDto.sort_enum);
    }
    const skip = (pageDto.page) * pageDto.take <= 0 ? 0 : (pageDto.page) * pageDto.take;
    if (pageDto.page !== null && pageDto.take !== null) {
      queryBuilder.skip(skip).take(pageDto.take);
    }

    return queryBuilder;
  }
}
