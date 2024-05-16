import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { Equipment } from '../../../entities/equipment.entity';

export default class EquipmentSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const specialEquipment = [
      {
        name: 'Máy chạy bộ',
        condition: 'Xuất sắc',
      },
      {
        name: 'Máy chạy bộ',
        condition: 'Tốt',
      },
      {
        name: 'Máy đạp elip',
        condition: 'Tốt',
      },
      {
        name: 'Xe đạp tĩnh',
        condition: 'Tốt',
      },
      {
        name: 'Máy chèo',
        condition: 'Xuất sắc',
      },
      {
        name: 'Máy chèo',
        condition: 'Kém',
      },
      {
        name: 'Tạ đa năng (5-50 lbs)',
        condition: 'Xuất sắc',
      },
      {
        name: 'Tạ đa năng (5-50 lbs)',
        condition: 'Tốt',
      },
      {
        name: 'Tạ đa năng (5-50 lbs)',
        condition: 'Tốt',
      },
      {
        name: 'Tạ đa năng (5-50 lbs)',
        condition: 'Tốt',
      },
      {
        name: 'Tạ đa năng (5-50 lbs)',
        condition: 'Kém',
      },
      {
        name: 'Thanh tạ và đĩa tạ',
        condition: 'Xuất sắc',
      },
      {
        name: 'Thanh tạ và đĩa tạ',
        condition: 'Xuất sắc',
      },
      {
        name: 'Thanh tạ và đĩa tạ',
        condition: 'Tốt',
      },
      {
        name: 'Quả tạ',
        condition: 'Tốt',
      },
      {
        name: 'Dây đàn hồi',
        condition: 'Xuất sắc',
      },
      {
        name: 'Dây treo TRX',
        condition: 'Tốt',
      },
      {
        name: 'Bóng y tế',
        condition: 'Xuất sắc',
      },
      {
        name: 'Bóng Bosu',
        condition: 'Tốt',
      },
      {
        name: 'Thảm yoga',
        condition: 'Xuất sắc',
      },
      {
        name: 'Thảm yoga',
        condition: 'Xuất sắc',
      },
      {
        name: 'Thảm yoga',
        condition: 'Xuất sắc',
      },
      {
        name: 'Dây nhảy',
        condition: 'Tốt',
      },
      {
        name: 'Nấc thang',
        condition: 'Tốt',
      },
      {
        name: 'Máy kéo cáp',
        condition: 'Xuất sắc',
      },
      {
        name: 'Máy kéo cáp Smith',
        condition: 'Tốt',
      },
      {
        name: 'Máy đẩy chân',
        condition: 'Xuất sắc',
      },
      {
        name: 'Máy kéo cánh tay trước',
        condition: 'Tốt',
      },
      {
        name: 'Máy kéo cánh tay ngồi',
        condition: 'Xuất sắc',
      },
      {
        name: 'Dây đánh giày',
        condition: 'Xuất sắc',
      },
      {
        name: 'Găng tay quyền Anh và túi đấm',
        condition: 'Tốt',
      },
      {
        name: 'Thanh ngang',
        condition: 'Tốt',
      },
      {
        name: 'Thanh ngang',
        condition: 'Tốt',
      },
      {
        name: 'Thanh ngang',
        condition: 'Kém',
      },
      {
        name: 'Thanh ngang',
        condition: 'Kém',
      },
      {
        name: 'Máy phát triển mông Glute-Ham',
        condition: 'Xuất sắc',
      },
      {
        name: 'Gầy đa năng',
        condition: 'Tốt',
      },
      {
        name: 'Máy đạp chèo',
        condition: 'Xuất sắc',
      },
      {
        name: 'Ghế tập lưng điều chỉnh được',
        condition: 'Tốt',
      },
      {
        name: 'Ghế tập lưng điều chỉnh được',
        condition: 'Tốt',
      },
      {
        name: 'Ghế đỡ đạp',
        condition: 'Xuất sắc',
      },
      {
        name: 'Thanh đỡ đa năng',
        condition: 'Tốt',
      },
      {
        name: 'Thanh đỡ đa năng',
        condition: 'Tốt',
      },
      {
        name: 'Ghế đẩy',
        condition: 'Xuất sắc',
      },
      {
        name: 'Cái đóng khối hex',
        condition: 'Tốt',
      },
      {
        name: 'Cái đóng khối hex',
        condition: 'Tốt',
      },
      {
        name: 'Hộp nhảy plyometric',
        condition: 'Xuất sắc',
      },
      {
        name: 'Cuộn cơ bụng',
        condition: 'Tốt',
      },
      {
        name: 'Máy kéo chân',
        condition: 'Xuất sắc',
      },
      {
        name: 'Máy kéo chân đứng lên',
        condition: 'Tốt',
      },
      {
        name: 'Máy kéo cánh tay Smith',
        condition: 'Xuất sắc',
      },
      {
        name: 'Máy đẩy cánh tay ngồi',
        condition: 'Tốt',
      },
      {
        name: 'Máy kéo cánh tay trên',
        condition: 'Xuất sắc',
      },
      {
        name: 'Máy tập mạnh tay Hammer Strength',
        condition: 'Tốt',
      },
      {
        name: 'Xe đẩy',
        condition: 'Xuất sắc',
      },
      {
        name: 'Bộ quả tạ (5-50 lbs)',
        condition: 'Xuất sắc',
      },
    ];

    try {
      await dataSource.createEntityManager().save(Equipment, specialEquipment);
      console.log('Equipment seeding successful!');
    } catch (error) {
      console.error(error);
    }
  }
}
