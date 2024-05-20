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
        name: 'Hướng dẫn tập Gym cá nhân',
        price: 50000,
        duration: 60,
        maxParticipants: 1,
        description: 'Personalized gym training session',
        service_type: ServiceTypeValue.PRIVATE,
        thumbnail:
          'https://file.hstatic.net/1000288768/file/ss-gym-sporty-woman-workout-with-trainer-wellness-healthy-bodybuilding_c210e486903d4212bb7adadf14df3602_grande.jpg',
      },
      // Add more services below
      {
        name: 'Lớp bơi cho trẻ em',
        price: 35000,
        duration: 30,
        maxParticipants: 8,
        description: 'Lớp học bơi dành cho trẻ em',
        service_type: ServiceTypeValue.GROUP,
        thumbnail:
          'https://asc.edu.vn/wp-content/uploads/2020/08/TheAqua-3.jpg',
      },
      {
        name: 'Hướng dẫn yoga trực tuyến cho người cao tuổi',
        price: 25000,
        duration: 45,
        maxParticipants: 1,
        description: 'Lớp học yoga trực tuyến dành cho người cao tuổi',
        service_type: ServiceTypeValue.ONLINE,
        thumbnail:
          'https://kickfit-sports.com/wp-content/uploads/2022/08/cac-lop-hoc-yoga-cho-nguoi-cao-tuoi-mang-toi-nhieu-loi-ich-tuyet-voi-1.webp',
      },
      {
        name: 'Tập thể dục ngoài trời',
        price: 15000,
        duration: 60,
        maxParticipants: 10,
        description: 'Buổi tập thể dục hàng ngày tại công viên',
        service_type: ServiceTypeValue.GROUP,
        thumbnail:
          'https://www.vinmec.com/s3-images/20210209_025440_801584_dung-cu-tap-the-tha.max-1800x1800.jpg',
      },
      {
        name: 'Lớp Pilates',
        price: 35000,
        duration: 50,
        maxParticipants: 10,
        description:
          'Tham gia lớp học Pilates để cải thiện vóc dáng và sức khỏe toàn diện.',
        service_type: ServiceTypeValue.GROUP,
        thumbnail: 'https://pilates.com.vn/uploads/images/gym-vs-pilates.jpg',
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
        name: 'Lớp Bootcamp',
        price: 40000,
        duration: 60,
        maxParticipants: 15,
        description:
          'Tham gia lớp học Bootcamp để rèn luyện cường độ cao và tăng cường sức mạnh.',
        service_type: ServiceTypeValue.GROUP,
        thumbnail:
          'https://st.depositphotos.com/1177254/4055/i/450/depositphotos_40558605-Mixed-Group-Doing-Boot-Camp-Exercise.jpg',
      },
      {
        name: 'Lớp Hiking',
        price: 25000,
        duration: 120,
        maxParticipants: 20,
        description:
          'Tham gia lớp học Hiking để khám phá thiên nhiên và rèn luyện sức khỏe.',
        service_type: ServiceTypeValue.GROUP,
        thumbnail:
          'https://didaudodi.com/uploads/images/2023/02/1676604352-single_news6-1kinhnghiemhikingchonguoimoibatdau.jpg',
      },
      {
        name: 'Lớp Bungee Jumping',
        price: 50000,
        duration: 180,
        maxParticipants: 5,
        description:
          'Trải nghiệm cảm giác mạnh mẽ và hứng khởi với lớp học Bungee Jumping.',
        service_type: ServiceTypeValue.GROUP,
        thumbnail: 'https://i.ytimg.com/vi/ZycsmGiMuZY/maxresdefault.jpg',
      },
      {
        name: 'Lớp Mediation',
        price: 30000,
        duration: 30,
        maxParticipants: 10,
        description:
          'Học kỹ thuật Mediation để giảm căng thẳng và cân bằng tâm trí.',
        service_type: ServiceTypeValue.GROUP,
        thumbnail: 'https://www.vyogaworld.net/upload/hinhanh/900x600_14.png',
      },
      {
        name: 'Lớp Barre',
        price: 35000,
        duration: 45,
        maxParticipants: 12,
        description:
          'Tham gia lớp học Barre để cải thiện sức mạnh cơ bắp và linh hoạt.',
        service_type: ServiceTypeValue.GROUP,
        thumbnail:
          'https://storage.googleapis.com/leep_app_website/2020/12/Huong-dan-sam-sua-trang-phuc-tap-barre-vua-thoi-trang-vua-thoai-mai.jpg',
      },
      {
        name: 'Lớp Surfing',
        price: 40000,
        duration: 90,
        maxParticipants: 8,
        description:
          'Học lớp Surfing để thách thức bản thân và trải nghiệm cảm giác tự do trên biển.',
        service_type: ServiceTypeValue.GROUP,
        thumbnail:
          'https://bizweb.dktcdn.net/100/421/579/products/hoc-luot-song-surfinghoian.jpg?v=1669961236057',
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
      {
        name: 'Tư vấn tập luyện cá nhân',
        price: 800000,
        duration: 60,
        maxParticipants: 1,
        description:
          'Nhận tư vấn tập luyện cá nhân để đạt được mục tiêu sức khỏe và thể chất.',
        service_type: ServiceTypeValue.SELF,
        thumbnail:
          'https://www.ptgymtainha.com/uploads/contents/hlv-2_1659805156.jpg',
      },
      {
        name: 'Yoga riêng',
        price: 600000,
        duration: 60,
        maxParticipants: 1,
        description:
          'Tham gia lớp học Yoga riêng để tập trung và phát triển kỹ thuật cá nhân.',
        service_type: ServiceTypeValue.PRIVATE,
        thumbnail:
          'https://www.yogavietnam.vn/wp-content/uploads/2020/01/beinks-bearth-yoga-matYoga_200962500jpg-1280x640.jpg',
      },
      {
        name: 'Tập Gym riêng',
        price: 700000,
        duration: 60,
        maxParticipants: 1,
        description:
          'Tham gia lớp học Gym riêng để được hướng dẫn tập trung và cải thiện kỹ thuật.',
        service_type: ServiceTypeValue.PRIVATE,
        thumbnail:
          'https://fitlifeprivategym.vn/img/fit-life-private-gym-phong-tap-gym-rieng-tu-hcm.webp',
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
