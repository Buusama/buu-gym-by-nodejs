import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
    UseFilters,
    UseInterceptors
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PublicRoute } from '../../commons/decorators/public-route.decorator';
import { EntityNotFoundErrorFilter } from '../../exception_filters/entity-not-found-error.filter';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { Session } from '../../entities/session.entity';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { SessionDto } from './dto';
import { SessionsService } from './sessions.service';

@ApiTags('sessions')
@UseInterceptors(TransformInterceptor)
@Controller('sessions')
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) { }

    @Put(':id')
    @PublicRoute()
    @ApiOkResponse({ description: 'Update session' })
    async updateSession(
        @Param('id') id: number,
        @Body() sessionDto: SessionDto,
    ) {
        return this.sessionsService.updateSession(id, sessionDto);
    }

    @Post()
    @PublicRoute()
    @ApiOkResponse({ description: 'Create session' })
    async createSession(@Body() sessionDto: SessionDto) {
        return this.sessionsService.createSession(sessionDto);
    }

    @Delete(':id')
    @PublicRoute()
    @UseFilters(EntityNotFoundErrorFilter)
    @ApiOkResponse({ description: 'Delete session' })
    async deleteSession(@Param('id') id: number) {
        return this.sessionsService.deleteSession(id);
    }

    @Post(':id/workouts/:workoutId')
    @PublicRoute()
    @ApiOkResponse({ description: 'Add workout to session' })
    async addWorkoutToSession(
        @Param('id') sessionId: number,
        @Param('workoutId') workoutId: number,
    ) {
        return this.sessionsService.addWorkoutToSession(sessionId, workoutId);
    }

    @Delete(':id/workouts/:workoutId')
    @PublicRoute()
    @ApiOkResponse({ description: 'Remove workout from session' })
    async removeWorkoutFromSession(
        @Param('id') sessionId: number,
        @Param('workoutId') workoutId: number,
    ) {
        return this.sessionsService.removeWorkoutFromSession(sessionId, workoutId);
    }
}
