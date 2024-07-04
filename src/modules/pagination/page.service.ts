import { Repository, SelectQueryBuilder } from 'typeorm';
import { PageDto } from './dto/page.dto';
import { SortEnum } from '../../commons/enums/sort/sort-enum';

export class PageService {
  protected paginate<T>(
    repositoryOrQueryBuilder: Repository<T> | SelectQueryBuilder<T>,
    pageDto: PageDto,
    rawAndLeftJoin: boolean = false,
  ): SelectQueryBuilder<T> {
    let queryBuilder: SelectQueryBuilder<T>;
    if (repositoryOrQueryBuilder instanceof Repository) {
      queryBuilder = repositoryOrQueryBuilder.createQueryBuilder('table');
    } else {
      queryBuilder = repositoryOrQueryBuilder;
    }

    this.applySorting(queryBuilder, pageDto);
    this.applyPagination(queryBuilder, pageDto);

    return queryBuilder;
  }

  private applySorting<T>(
    queryBuilder: SelectQueryBuilder<T>,
    pageDto: PageDto,
  ): void {
    if (pageDto.sort_by && pageDto.sort_enum) {
      queryBuilder.addOrderBy(pageDto.sort_by, pageDto.sort_enum);
    }
  }

  private applyPagination<T>(
    queryBuilder: SelectQueryBuilder<T>,
    pageDto: PageDto,
  ): void {
    if (pageDto.page !== null && pageDto.take !== null) {
      let skip = Math.max(0, pageDto.page * pageDto.take);
      skip = isNaN(skip) ? 0 : skip;
      queryBuilder.skip(skip).take(pageDto.take);
    }
  }
}
