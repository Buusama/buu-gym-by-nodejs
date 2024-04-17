import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Schedule } from "src/entities/schedule.entity";
import { Service } from "src/entities/service.entity";
import { Repository } from "typeorm";
import { PageResponseDto } from "../pagination/dto/page-response.dto";
import { GetSchedulesByServiceIdAndDayDto } from "./dto";
import { PageMetaDto } from "../pagination/dto/page-meta.dto";

@Injectable()
export class SchedulesService {
    constructor(
        @InjectRepository(Schedule)
        private schedulesRepository: Repository<Schedule>,
        @InjectRepository(Service)
        private servicesRepository: Repository<Service>,
    ) { }

    async findOneById(id: number): Promise<Schedule> {
        return this.schedulesRepository.findOneByOrFail({ id });
    }

    async getSchedulesByServiceIdAndDay(service_id: number, dto: GetSchedulesByServiceIdAndDayDto): Promise<any> {

        const service = await this.servicesRepository.findOneBy({ id: service_id })
        if (!service) {
            throw new Error(`Service with id ${service_id} not found`);
        }
        const schedules = await this.schedulesRepository.createQueryBuilder('schedule')
            .select([
                'schedule.id AS id',
                'schedule.date AS date',
                'schedule.time AS time',
                'service.name AS serviceName',
            ])
            .leftJoin('schedule.service', 'service')
            .where('schedule.service_id = :service_id', { service_id })
            .andWhere('schedule.date = :date', { date: dto.date })
            .orderBy('schedule.time', 'ASC')
            .getRawMany();

        // PAGE RESPONSE DTO
        const itemCount = schedules.length;
        const pageMeta = new PageMetaDto(dto, itemCount);

        return new PageResponseDto(schedules, pageMeta);
    }
}