import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Service } from '../../../entities/service.entity';
import { DataSource } from 'typeorm';
import { fakerVI } from '@faker-js/faker';
import { ServiceTypeValue } from '../../../commons/enums/services/service-type';

export default class ServicesSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const specialServices = [
      {
        name: 'Gói kèm tập luyện 3 buổi/tuần',
        price: 30000,
        duration: 60,
        maxParticipants: 1,
        description: 'Gói tập luyện 3 buổi/tuần cho người mới bắt đầu',
        service_type: ServiceTypeValue.PRIVATE,
        thumbnail:
          'https://file.hstatic.net/1000288768/file/ss-gym-sporty-woman-workout-with-trainer-wellness-healthy-bodybuilding_c210e486903d4212bb7adadf14df3602_grande.jpg',
      },
      {
        name: 'Gói kèm tập luyện 4 buổi/tuần',
        price: 50000,
        duration: 60,
        maxParticipants: 1,
        description:
          'Gói tập luyện 4 buổi/tuần cho người muốn cải thiện sức khỏe',
        service_type: ServiceTypeValue.PRIVATE,
        thumbnail:
          'https://file.hstatic.net/1000288768/file/ss-gym-sporty-woman-workout-with-trainer-wellness-healthy-bodybuilding_c210e486903d4212bb7adadf14df3602_grande.jpg',
      },
      {
        name: 'Gói kèm tập luyện 5 buổi/tuần',
        price: 70000,
        duration: 60,
        maxParticipants: 1,
        description:
          'Gói tập luyện 5 buổi/tuần cho người muốn rèn luyện cơ bắp',
        service_type: ServiceTypeValue.PRIVATE,
        thumbnail:
          'https://file.hstatic.net/1000288768/file/ss-gym-sporty-woman-workout-with-trainer-wellness-healthy-bodybuilding_c210e486903d4212bb7adadf14df3602_grande.jpg',
      },
      {
        name: 'Lớp Online về yoga',
        price: 30000,
        duration: 40,
        maxParticipants: 2,
        description:
          'Được hướng dẫn bởi Huấn luyện viên chuyên nghiệp trong lĩnh vực Yoga',
        service_type: ServiceTypeValue.ONLINE,
        thumbnail:
          'https://file.hstatic.net/200000648327/file/yoga_online_c79a1c87d3ca4c82bc3d582421f2bcc5.jpg',
      },
      {
        name: 'Lớp Dance sport',
        price: 20000,
        duration: 50,
        maxParticipants: 20,
        description: 'Some description here',
        service_type: ServiceTypeValue.GROUP,
        thumbnail:
          'https://oms.hotdeal.vn/images/editors/sources/000352339910/352339-khoa-hoc-dance-sport-MyWings-dance-body-7.jpg',
      },
      {
        name: 'Lớp Zumba',
        price: 25000,
        duration: 45,
        maxParticipants: 15,
        description: 'Description for Zumba class',
        service_type: ServiceTypeValue.GROUP,
        thumbnail:
          'https://nhatdangnhida.com/assets/services/2020_05/lop-zumba-nang-cao_1.jpg',
      },
      {
        name: 'Lớp Muay Thai',
        price: 30000,
        duration: 60,
        maxParticipants: 12,
        description:
          'Học Muay Thai để rèn luyện sức mạnh và kỹ thuật chiến đấu.',
        service_type: ServiceTypeValue.GROUP,
        thumbnail:
          'https://www.thethaothientruong.vn/uploads/contents/hoc-muay-thai-o-akc-fitness-ha-noi.jpg',
      },
      {
        name: 'Lớp Boxing',
        price: 30000,
        duration: 60,
        maxParticipants: 10,
        description: 'Tham gia lớp học Boxing để rèn luyện thể lực và tự vệ.',
        service_type: ServiceTypeValue.GROUP,
        thumbnail:
          'https://source.unsplash.com/featured/?boxinghttps://images.elipsport.vn/anh-seo-tin-tuc/2020/12/14/boxing-cu-chi-ho-chi-minh-1.jpg',
      },
      {
        name: 'Lớp Crossfit',
        price: 45000,
        duration: 60,
        maxParticipants: 15,
        description:
          'Tham gia lớp học Crossfit để tăng cường sức mạnh và sức bền.',
        service_type: ServiceTypeValue.GROUP,
        thumbnail: 'https://cdn.thehinh.com/2016/08/crossfit-la-gi-4.jpg',
      },
      {
        name: 'Tư vấn dinh dưỡng',
        price: 500000,
        duration: 60,
        maxParticipants: 1,
        description:
          'Nhận tư vấn dinh dưỡng cá nhân để có chế độ ăn lành mạnh và cân đối.',
        service_type: ServiceTypeValue.SELF,
        thumbnail:
          'https://www.hanhphuchospital.com/wp-content/uploads/2020/03/Tu-van-dinh-duong-895x597.jpg',
      },
    ];

    try {
      await dataSource.createEntityManager().save(Service, specialServices);
      console.log('Services seeding successful!');
    } catch (error) {
      console.error('Error occurred while seeding Services', error.message);
    }
  }
}
