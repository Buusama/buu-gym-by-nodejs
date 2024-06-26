import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

interface TrainingTime {
    dayOfWeek: number;
    start_time: string;
    end_time: string;
    workout: number;
    trainer: number;
}

@ValidatorConstraint({ name: 'uniqueTrainingTimes', async: false })
export class UniqueTrainingTimesValidator implements ValidatorConstraintInterface {
    validate(trainingTimes: TrainingTime[], args: ValidationArguments) {
        for (let i = 0; i < trainingTimes.length; i++) {
            for (let j = i + 1; j < trainingTimes.length; j++) {
                if (this.isOverlapping(trainingTimes[i], trainingTimes[j])) {
                    return false;
                }
            }
        }
        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Lịch đăng ký bị trùng lặp';
    }

    private isOverlapping(time1: TrainingTime, time2: TrainingTime): boolean {
        if (time1.dayOfWeek !== time2.dayOfWeek || time1.trainer !== time2.trainer) {
            return false;
        }

        const start1 = new Date(`1970-01-01T${time1.start_time}:00Z`).getTime();
        const end1 = new Date(`1970-01-01T${time1.end_time}:00Z`).getTime();
        const start2 = new Date(`1970-01-01T${time2.start_time}:00Z`).getTime();
        const end2 = new Date(`1970-01-01T${time2.end_time}:00Z`).getTime();

        return (start1 < end2 && start2 < end1);
    }
}
