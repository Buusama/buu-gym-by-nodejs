import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Service } from '../../../entities/service.entity';
import { DataSource } from 'typeorm';
import { fakerVI } from '@faker-js/faker';
import { ServiceTypeValue } from '../../../commons/enums/services/service-type';

export default class ServicesSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const specialServices = [
      {
        name: 'Lớp Online về yoga',
        price: 30000,
        duration: 40,
        maxParticipants: 2,
        description:
          'Được hướng dẫn bởi Huấn luyện viên chuyên nghiệp trong lĩnh vực Yoga',
        serviceType: ServiceTypeValue.ONLINE,
        thumbnail: 'https://source.unsplash.com/featured/?yoga',
      },
      {
        name: 'Lớp Dance sport',
        price: 20000,
        duration: 50,
        maxParticipants: 20,
        description: 'Some description here',
        serviceType: ServiceTypeValue.GROUP,
        thumbnail: 'https://source.unsplash.com/featured/?dance',
      },
      {
        name: 'Lớp Zumba',
        price: 25000,
        duration: 45,
        maxParticipants: 15,
        description: 'Description for Zumba class',
        serviceType: ServiceTypeValue.GROUP,
        thumbnail: 'https://source.unsplash.com/featured/?zumba',
      },
      {
        name: 'Hướng dẫn tập Gym cá nhân',
        price: 50000,
        duration: 60,
        maxParticipants: 1,
        description: 'Personalized gym training session',
        serviceType: ServiceTypeValue.PRIVATE,
        thumbnail: 'https://source.unsplash.com/featured/?gym',
      },
      // Add more services below
      {
        name: 'Lớp bơi cho trẻ em',
        price: 35000,
        duration: 30,
        maxParticipants: 8,
        description: 'Lớp học bơi dành cho trẻ em',
        serviceType: ServiceTypeValue.GROUP,
        thumbnail: 'https://source.unsplash.com/featured/?swimming',
      },
      {
        name: 'Hướng dẫn yoga trực tuyến cho người cao tuổi',
        price: 25000,
        duration: 45,
        maxParticipants: 1,
        description: 'Lớp học yoga trực tuyến dành cho người cao tuổi',
        serviceType: ServiceTypeValue.ONLINE,
        thumbnail: 'https://source.unsplash.com/featured/?seniors',
      },
      {
        name: 'Tập thể dục ngoài trời',
        price: 15000,
        duration: 60,
        maxParticipants: 10,
        description: 'Buổi tập thể dục hàng ngày tại công viên',
        serviceType: ServiceTypeValue.GROUP,
        thumbnail: 'https://source.unsplash.com/featured/?outdoor',
      },
      {
        name: 'Lớp Pilates',
        price: 35000,
        duration: 50,
        maxParticipants: 10,
        description:
          'Tham gia lớp học Pilates để cải thiện vóc dáng và sức khỏe toàn diện.',
        serviceType: ServiceTypeValue.GROUP,
        thumbnail: 'https://source.unsplash.com/featured/?pilates',
      },
      {
        name: 'Lớp Muay Thai',
        price: 30000,
        duration: 60,
        maxParticipants: 12,
        description:
          'Học Muay Thai để rèn luyện sức mạnh và kỹ thuật chiến đấu.',
        serviceType: ServiceTypeValue.GROUP,
        thumbnail: 'https://source.unsplash.com/featured/?muaythai',
      },
      {
        name: 'Lớp Bootcamp',
        price: 40000,
        duration: 60,
        maxParticipants: 15,
        description:
          'Tham gia lớp học Bootcamp để rèn luyện cường độ cao và tăng cường sức mạnh.',
        serviceType: ServiceTypeValue.GROUP,
        thumbnail: 'https://source.unsplash.com/featured/?bootcamp',
      },
      {
        name: 'Lớp Hiking',
        price: 25000,
        duration: 120,
        maxParticipants: 20,
        description:
          'Tham gia lớp học Hiking để khám phá thiên nhiên và rèn luyện sức khỏe.',
        serviceType: ServiceTypeValue.GROUP,
        thumbnail: 'https://source.unsplash.com/featured/?hiking',
      },
      {
        name: 'Lớp Bungee Jumping',
        price: 50000,
        duration: 180,
        maxParticipants: 5,
        description:
          'Trải nghiệm cảm giác mạnh mẽ và hứng khởi với lớp học Bungee Jumping.',
        serviceType: ServiceTypeValue.GROUP,
        thumbnail: 'https://source.unsplash.com/featured/?bungeejumping',
      },
      {
        name: 'Lớp Mediation',
        price: 30000,
        duration: 30,
        maxParticipants: 10,
        description:
          'Học kỹ thuật Mediation để giảm căng thẳng và cân bằng tâm trí.',
        serviceType: ServiceTypeValue.GROUP,
        thumbnail: 'https://source.unsplash.com/featured/?meditation',
      },
      {
        name: 'Lớp Barre',
        price: 35000,
        duration: 45,
        maxParticipants: 12,
        description:
          'Tham gia lớp học Barre để cải thiện sức mạnh cơ bắp và linh hoạt.',
        serviceType: ServiceTypeValue.GROUP,
        thumbnail: 'https://source.unsplash.com/featured/?barre',
      },
      {
        name: 'Lớp Surfing',
        price: 40000,
        duration: 90,
        maxParticipants: 8,
        description:
          'Học lớp Surfing để thách thức bản thân và trải nghiệm cảm giác tự do trên biển.',
        serviceType: ServiceTypeValue.GROUP,
        thumbnail: 'https://source.unsplash.com/featured/?surfing',
      },
      {
        name: 'Lớp Boxing',
        price: 30000,
        duration: 60,
        maxParticipants: 10,
        description: 'Tham gia lớp học Boxing để rèn luyện thể lực và tự vệ.',
        serviceType: ServiceTypeValue.GROUP,
        thumbnail: 'https://source.unsplash.com/featured/?boxing',
      },
      {
        name: 'Lớp Crossfit',
        price: 45000,
        duration: 60,
        maxParticipants: 15,
        description:
          'Tham gia lớp học Crossfit để tăng cường sức mạnh và sức bền.',
        serviceType: ServiceTypeValue.GROUP,
        thumbnail: 'https://source.unsplash.com/featured/?crossfit',
      },
      {
        name: 'Tư vấn dinh dưỡng',
        price: 500000,
        duration: 60,
        maxParticipants: 1,
        description:
          'Nhận tư vấn dinh dưỡng cá nhân để có chế độ ăn lành mạnh và cân đối.',
        serviceType: ServiceTypeValue.SELF,
        thumbnail: 'https://source.unsplash.com/featured/?nutrition',
      },
      {
        name: 'Tư vấn tập luyện cá nhân',
        price: 800000,
        duration: 60,
        maxParticipants: 1,
        description:
          'Nhận tư vấn tập luyện cá nhân để đạt được mục tiêu sức khỏe và thể chất.',
        serviceType: ServiceTypeValue.SELF,
        thumbnail: 'https://source.unsplash.com/featured/?personaltraining',
      },
      {
        name: 'Yoga riêng',
        price: 600000,
        duration: 60,
        maxParticipants: 1,
        description:
          'Tham gia lớp học Yoga riêng để tập trung và phát triển kỹ thuật cá nhân.',
        serviceType: ServiceTypeValue.PRIVATE,
        thumbnail: 'https://source.unsplash.com/featured/?privateyoga',
      },
      {
        name: 'Tập Gym riêng',
        price: 700000,
        duration: 60,
        maxParticipants: 1,
        description:
          'Tham gia lớp học Gym riêng để được hướng dẫn tập trung và cải thiện kỹ thuật.',
        serviceType: ServiceTypeValue.PRIVATE,
        thumbnail: 'https://source.unsplash.com/featured/?privategym',
      },
    ];

    try {
      await dataSource.createEntityManager().save(Service, specialServices);
    } catch (error) {
      console.error('Error occurred while seeding Services', error.message);
    }
  }
}