import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Attendance } from "../../entities/attendance.entity";
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

        if (dto.start_date && dto.end_date) {
            query.andWhere('date BETWEEN :start_date AND :end_date', {
                start_date: dto.start_date,
                end_date: dto.end_date
            });
        }

        if (dto.member_id) {
            query.andWhere('member_id = :member_id', {
                member_id: dto.member_id
            });
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
