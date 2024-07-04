import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Member } from '../../../entities/member.entity';
import { Trainer } from '../../../entities/trainer.entity';
import { Workout } from '../../../entities/workout.entity';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

export default class BookingSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    try {
      // Fetch members, trainers, and workouts from the database
      const members = await dataSource.getRepository(Member).find();
      const trainers = await dataSource.getRepository(Trainer).find();
      const workouts = await dataSource.getRepository(Workout).find();

      if (members.length === 0 || trainers.length === 0 || workouts.length === 0) {
        throw new Error('No members, trainers, or workouts found in the database.');
      }

      // Generate booking data
      const bookingData = this.generateBookingData(workouts, members, trainers, 300);

      // Insert booking data into the 'bookings' table
      await dataSource
        .createQueryBuilder()
        .insert()
        .into('bookings')
        .values(bookingData)
        .execute();

      console.log('Bookings seeding successful!');
    } catch (error) {
      console.error('Error occurred while seeding bookings:', error.message);
    }
  }

  private generateBookingData(
    workouts: Workout[],
    members: Member[],
    trainers: Trainer[],
    count: number,
  ) {
    const bookings = Array.from({ length: count }, () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const randomDate = this.getRandomDateInCurrentMonth(currentMonth, currentYear);
      const bookingEntry = {
        trainer_id: null,
        date: randomDate.toISOString().split('T')[0],
      };

      const randomMember = members[faker.number.int({ min: 0, max: members.length - 1 })];
      const randomWorkout = workouts[faker.number.int({ min: 0, max: workouts.length - 1 })];

      const { start_time, end_time } = this.getRandomTimeInRange(randomWorkout.duration);

      return {
        ...bookingEntry,
        member_id: randomMember.id,
        workout_id: randomWorkout.id,
        participants: faker.number.int({ min: 1, max: 10 }),
        payment_method: faker.number.int({ min: 0, max: 2 }),
        note: faker.lorem.sentence(),
        status: faker.number.int({ min: 0, max: 1 }),
        start_time,
        end_time,
      };
    });

    // Randomly assign trainers to bookings
    bookings.forEach(booking => {
      if (Math.random() > 0.8) {
        const randomWorkout = workouts.find(workout => workout.id === booking.workout_id);
        if (randomWorkout && randomWorkout.trainers.length > 0) {
          const randomTrainer = randomWorkout.trainers[faker.number.int({ min: 0, max: randomWorkout.trainers.length - 1 })];
          booking.trainer_id = randomTrainer.id;
        }
      }
    });

    return bookings;
  }

  private getRandomDateInCurrentMonth(month: number, year: number): Date {
    const start = new Date('2024-07-01');
    const end = new Date('2024-07-30'); // Last day of the month
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  }

  private getRandomTimeInRange(duration: number): { start_time: string, end_time: string } {
    const morningStart = new Date();
    morningStart.setHours(5, 0, 0, 0);
    const morningEnd = new Date();
    morningEnd.setHours(7, 0, 0, 0);

    const eveningStart = new Date();
    eveningStart.setHours(17, 0, 0, 0);
    const eveningEnd = new Date();
    eveningEnd.setHours(18, 0, 0, 0);

    const isMorning = Math.random() > 0.7;
    const start = isMorning ? morningStart : eveningStart;
    const end = isMorning ? morningEnd : eveningEnd;

    const randomStart = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const randomEnd = new Date(randomStart.getTime() + duration * 60000);

    return {
      start_time: randomStart.toTimeString().split(' ')[0],
      end_time: randomEnd.toTimeString().split(' ')[0],
    };
  }
}
