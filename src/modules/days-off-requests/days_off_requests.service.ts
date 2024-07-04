import { Injectable } from '@nestjs/common';
import { PageService } from '../pagination/page.service';
import { DaysOffRequest } from '../../entities/days-off-requests.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { CreateDaysOffRequestDto, GetListDaysOffRequestDto } from './dto';
import { DaysOffRequestStatusValue } from '../../commons/enums/days-off-request/days-off-request-status';

@Injectable()
export class DaysOffRequestService extends PageService {
  constructor(
    @InjectRepository(DaysOffRequest)
    private daysOffRepository: Repository<DaysOffRequest>,
  ) {
    super();
  }

  async getListDaysOffRequest(
    getListDaysOffRequestDto: GetListDaysOffRequestDto,
  ): Promise<PageResponseDto<DaysOffRequest>> {
    const queryBuilder = await this.paginate(
      this.daysOffRepository,
      getListDaysOffRequestDto,
    );
    queryBuilder
      .select([
        'table.id as id',
        'table.date as date',
        'table.note as note',
        'table.status as status',
        'user.name as trainer_name',
        'user.avatar as trainer_avatar',
      ])
      .leftJoin('table.trainer', 'trainer')
      .leftJoin('trainer.staff', 'staff')
      .leftJoin('staff.user', 'user');

    if (getListDaysOffRequestDto.status)
      queryBuilder.andWhere('table.status = :status', {
        status: getListDaysOffRequestDto.status,
      });

    if (
      getListDaysOffRequestDto.field &&
      getListDaysOffRequestDto.type &&
      getListDaysOffRequestDto.value
    ) {
      if (getListDaysOffRequestDto.type === 'like') {
        getListDaysOffRequestDto.value = `%${getListDaysOffRequestDto.value}%`;
      }

      queryBuilder.andWhere(
        `${getListDaysOffRequestDto.field} ${getListDaysOffRequestDto.type} :value`,
        {
          value: getListDaysOffRequestDto.value,
        },
      );
    }

    const itemCount = await queryBuilder.getCount();
    let entities = await queryBuilder.getRawMany().then((response) => {
      response.forEach((element) => {
        element.date = element.date.toISOString().split('T')[0];
      });
      return response;
    });

    const pageMeta = new PageMetaDto(getListDaysOffRequestDto, itemCount);

    if (pageMeta.page >= 0 && pageMeta.take >= 0)
      entities = entities.slice(
        pageMeta.take * pageMeta.page,
        pageMeta.take * (pageMeta.page + 1),
      );

    return new PageResponseDto(entities, pageMeta);
  }

  async createDaysOffRequest(
    createDaysOffRequestDto: CreateDaysOffRequestDto,
  ): Promise<PageResponseDto<DaysOffRequest>> {
    const newDaysOffRequest = new DaysOffRequest();
    const { ...params } = createDaysOffRequestDto;
    Object.assign(newDaysOffRequest, params);
    await this.daysOffRepository.save(newDaysOffRequest);
    return new PageResponseDto(newDaysOffRequest);
  }

  async getDaysOffRequest(
    id: number,
  ): Promise<PageResponseDto<DaysOffRequest>> {
    return this.daysOffRepository
      .findOneByOrFail({ id: id })
      .then((response) => new PageResponseDto(response));
  }

  async updateDaysOffRequest(
    id: number,
    updateDaysOffRequestDto: CreateDaysOffRequestDto,
  ): Promise<PageResponseDto<DaysOffRequest>> {
    const existingDaysOffRequest = await this.daysOffRepository.findOneByOrFail(
      {
        id: id,
      },
    );
    const { ...params } = updateDaysOffRequestDto;

    this.daysOffRepository.merge(existingDaysOffRequest, params);
    await this.daysOffRepository.save(existingDaysOffRequest);
    return this.getDaysOffRequest(id);
  }

  async deleteDaysOffRequest(
    id: number,
  ): Promise<PageResponseDto<DaysOffRequest>> {
    const existingDaysOffRequest = await this.daysOffRepository.findOneByOrFail(
      {
        id: id,
      },
    );

    const deletedDaysOffRequest = await this.daysOffRepository.remove(
      existingDaysOffRequest,
    );
    this.daysOffRepository.save(deletedDaysOffRequest);
    return new PageResponseDto(existingDaysOffRequest);
  }

  async approveDaysOffRequest(
    id: number,
  ): Promise<PageResponseDto<DaysOffRequest>> {
    const existingDaysOffRequest = await this.daysOffRepository.findOneByOrFail(
      {
        id: id,
      },
    );
    existingDaysOffRequest.status = DaysOffRequestStatusValue.APPROVED;
    await this.daysOffRepository.save(existingDaysOffRequest);
    return this.getDaysOffRequest(id);
  }

  async rejectDaysOffRequest(
    id: number,
  ): Promise<PageResponseDto<DaysOffRequest>> {
    const existingDaysOffRequest = await this.daysOffRepository.findOneByOrFail(
      {
        id: id,
      },
    );
    existingDaysOffRequest.status = DaysOffRequestStatusValue.REJECTED;
    await this.daysOffRepository.save(existingDaysOffRequest);
    return this.getDaysOffRequest(id);
  }
}
