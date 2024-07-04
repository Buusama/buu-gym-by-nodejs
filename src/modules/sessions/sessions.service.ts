import { Session } from "../../entities/session.entity";
import { PageService } from "../pagination/page.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SessionDto } from "./dto";
import { PageResponseDto } from "../pagination/dto/page-response.dto";
import { Workout } from "../../entities/workout.entity";
import { ConflictException, NotFoundException } from "@nestjs/common";

export class SessionsService extends PageService {
    constructor(
        @InjectRepository(Session)
        private sessionRepo: Repository<Session>,
        @InjectRepository(Workout)
        private workoutRepo: Repository<Workout>
    ) {
        super();
    }

    async createSession(sessionDto: SessionDto) {
        const { ...params } = sessionDto;
        const session = this.sessionRepo.create(params);
        await this.sessionRepo.save(session);
        return new PageResponseDto(session);

    }

    async updateSession(id: number, sessionDto: SessionDto) {
        const session = await this.sessionRepo.findOne({ where: { id } });
        const { ...params } = sessionDto;
        await this.sessionRepo.update(id, params);
        return new PageResponseDto(session);
    }

    async deleteSession(id: number) {
        const session = await this.sessionRepo.findOne({ where: { id } });
        await this.sessionRepo.delete(id);
        return new PageResponseDto(session);
    }

    async addWorkoutToSession(sessionId: number, workoutId: number): Promise<void> {
        // Tìm session có sessionId
        const session = await this.sessionRepo.findOne({
            where: { id: sessionId },
            relations: ['workouts'],
        });
        if (!session) {
            throw new NotFoundException('Session not found');
        }

        // Tìm workout có workoutId
        const workout = await this.workoutRepo.findOne({ where: { id: workoutId } });
        if (!workout) {
            throw new NotFoundException('Workout not found');
        }

        // Kiểm tra xem workout đã tồn tại trong session chưa
        const existingWorkout = session.workouts.find(w => w.id == workoutId);
        if (existingWorkout) {
            throw new ConflictException('Workout already exists in the session');
        }

        // Thêm workout vào session
        session.workouts.push(workout);
        await this.sessionRepo.save(session);
    }

    async removeWorkoutFromSession(sessionId: number, workoutId: number): Promise<void> {
        // Tìm session có sessionId
        const session = await this.sessionRepo.findOne({
            where: { id: sessionId },
            relations: ['workouts'],
        });
        if (!session) {
            throw new NotFoundException('Session not found');
        }

        // Tìm workout có workoutId
        const workout = await this.workoutRepo.findOne({
            where: { id: workoutId },
        });
        if (!workout) {
            throw new NotFoundException('Workout not found');
        }

        // Kiểm tra xem workout có tồn tại trong session không
        const existingWorkout = session.workouts.find(w => w.id == workoutId);
        if (!existingWorkout) {
            throw new ConflictException('Workout not found in the session');
        }

        // Xóa workout khỏi session
        session.workouts = session.workouts.filter(w => w.id != workoutId);
        await this.sessionRepo.save(session);
    }

    async getSessionsByServiceId(serviceId: number) {
        return await this.sessionRepo.find({ where: { service_id: serviceId }, relations: ['workouts', 'workouts.trainers'] });
    }
}