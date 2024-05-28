import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { Equipment } from '../../../entities/equipment.entity';

export default class EquipmentSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const specialEquipment = [
      { name: 'Máy chạy bộ' },
      { name: 'Máy đạp elip' },
      { name: 'Xe đạp tĩnh' },
      { name: 'Máy chèo' },
      { name: 'Tạ đa năng (5-50 lbs)' },
      { name: 'Thanh tạ và đĩa tạ' },
      { name: 'Quả tạ' },
      { name: 'Dây đàn hồi' },
      { name: 'Dây treo TRX' },
      { name: 'Bóng y tế' },
      { name: 'Bóng Bosu' },
      { name: 'Thảm yoga' },
      { name: 'Dây nhảy' },
      { name: 'Nấc thang' },
      { name: 'Máy kéo cáp' },
      { name: 'Máy kéo cáp Smith' },
      { name: 'Máy đẩy chân' },
      { name: 'Máy kéo cánh tay trước' },
      { name: 'Máy kéo cánh tay ngồi' },
      { name: 'Dây đánh giày' },
      { name: 'Găng tay quyền Anh và túi đấm' },
      { name: 'Thanh ngang' },
      { name: 'Máy phát triển mông Glute-Ham' },
      { name: 'Gầy đa năng' },
      { name: 'Máy đạp chèo' },
      { name: 'Ghế tập lưng điều chỉnh được' },
      { name: 'Ghế đỡ đạp' },
      { name: 'Thanh đỡ đa năng' },
      { name: 'Ghế đẩy' },
      { name: 'Cái đóng khối hex' },
      { name: 'Hộp nhảy plyometric' },
      { name: 'Cuộn cơ bụng' },
      { name: 'Máy kéo chân' },
      { name: 'Máy kéo chân đứng lên' },
      { name: 'Máy kéo cánh tay Smith' },
      { name: 'Máy đẩy cánh tay ngồi' },
      { name: 'Máy kéo cánh tay trên' },
      { name: 'Máy tập mạnh tay Hammer Strength' },
      { name: 'Xe đẩy' },
      { name: 'Bộ quả tạ (5-50 lbs)' },
    ];

    // Remove duplicates based on the 'name' property
    const uniqueEquipment = Array.from(new Set(specialEquipment.map(item => item.name)))
      .map(name => {
        return { name };
      });

    try {
      await dataSource.createEntityManager().save(Equipment, uniqueEquipment);
      console.log('Equipment seeding successful!');
    } catch (error) {
      console.error(error);
    }
  }
}
