import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Attendance } from "src/entities/attendance.entity";
import { Repository } from "typeorm";
import { PageService } from "../pagination/page.service";
import { CreateAttendanceDto, FindAllAttendanceDto } from "./dto";
import { PageResponseDto } from "../pagination/dto/page-response.dto";
import { PageMetaDto } from "../pagination/dto/page-meta.dto";

@Injectable()
export class AttendanceService extends PageService {
    constructor(
        @InjectRepository(Attendance)
        private attendanceRepository: Repository<Attendance>
    ) {
        super();
    }

    async getAttendance(dto: FindAllAttendanceDto) {
        const query = this.paginate(this.attendanceRepository, dto);

        if (dto.date) {
            query.andWhere('date = :date', { date: dto.date });
        }

        if (dto.member_id) {
            query.andWhere('member_id = :member_id', { member_id: dto.member_id });
        }

        if (dto.time_in) {
            query.andWhere('time_in = :time_in', { time_in: dto.time_in });
        }

        if (dto.time_out) {
            query.andWhere('time_out = :time_out', { time_out: dto.time_out });
        }

        const entities = await query.getMany();
        const count = await query.getCount();

        const pageMeta = new PageMetaDto
            (dto, count);
        return new PageResponseDto(entities, pageMeta);
    }

    async createAttendance(dto: CreateAttendanceDto) {
        const attendance = new Attendance();
        const { ...params } = dto;
        Object.assign(attendance, params);
        await this.attendanceRepository.save(attendance);
        return new PageResponseDto(attendance);
    }

    async updateAttendance(id: number, dto: CreateAttendanceDto) {
        const attendance = await this.attendanceRepository.findOne({
            where: { id }
        });
        const { ...params } = dto;

        Object.assign(attendance, params);
        await this.attendanceRepository.save(attendance);
        return new PageResponseDto(attendance);
    }

    async deleteAttendance(id: number) {
        const attendance = await this.attendanceRepository.findOne({
            where: { id }
        })
        await this.attendanceRepository.remove(attendance);
        return new PageResponseDto(attendance);
    }


    async getAttendanceById(id: number) {
        const attendance = await this.attendanceRepository.findOne({
            where: { id }
        });
        return new PageResponseDto(attendance);
    }




}
