import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { EquipmentCategory } from '../../../entities/equipment-category.entity';

export default class EquipmentSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const specialEquipment = [
      { name: 'Máy chạy bộ', max_capacity: 3 },
      { name: 'Máy đạp elip', max_capacity: 3 },
      { name: 'Xe đạp tĩnh', max_capacity: 2 },
      { name: 'Máy chèo', max_capacity: 4 },
      { name: 'Tạ đa năng (5-50 lbs)', max_capacity: 1 },
      { name: 'Thanh tạ và đĩa tạ', max_capacity: 1 },
      { name: 'Quả tạ', max_capacity: 1 },
      { name: 'Dây đàn hồi', max_capacity: 2 },
      { name: 'Dây treo TRX', max_capacity: 2 },
      { name: 'Bóng y tế', max_capacity: 1 },
      { name: 'Bóng Bosu', max_capacity: 1 },
      { name: 'Thảm yoga', max_capacity: 1 },
      { name: 'Dây nhảy', max_capacity: 2 },
      { name: 'Nấc thang', max_capacity: 2 },
      { name: 'Máy kéo cáp', max_capacity: 3 },
      { name: 'Máy kéo cáp Smith', max_capacity: 3 },
      { name: 'Máy đẩy chân', max_capacity: 2 },
      { name: 'Máy kéo cánh tay trước', max_capacity: 3 },
      { name: 'Máy kéo cánh tay ngồi', max_capacity: 3 },
      { name: 'Dây đánh giày', max_capacity: 2 },
      { name: 'Găng tay quyền Anh và túi đấm', max_capacity: 1 },
      { name: 'Thanh ngang', max_capacity: 3 },
      { name: 'Máy phát triển mông Glute-Ham', max_capacity: 2 },
      { name: 'Gầy đa năng', max_capacity: 2 },
      { name: 'Máy đạp chèo', max_capacity: 2 },
      { name: 'Ghế tập lưng điều chỉnh được', max_capacity: 1 },
      { name: 'Ghế đỡ đạp', max_capacity: 1 },
      { name: 'Thanh đỡ đa năng', max_capacity: 2 },
      { name: 'Ghế đẩy', max_capacity: 1 },
      { name: 'Cái đóng khối hex', max_capacity: 2 },
      { name: 'Hộp nhảy plyometric', max_capacity: 1 },
      { name: 'Cuộn cơ bụng', max_capacity: 1 },
      { name: 'Máy kéo chân', max_capacity: 3 },
      { name: 'Máy kéo chân đứng lên', max_capacity: 3 },
      { name: 'Máy kéo cánh tay Smith', max_capacity: 3 },
      { name: 'Máy đẩy cánh tay ngồi', max_capacity: 3 },
      { name: 'Máy kéo cánh tay trên', max_capacity: 3 },
      { name: 'Máy tập mạnh tay Hammer Strength', max_capacity: 2 },
      { name: 'Xe đẩy', max_capacity: 1 },
      { name: 'Bộ quả tạ (5-50 lbs)', max_capacity: 1 },
    ];

    // Remove duplicates based on the 'name' property
    const uniqueEquipment = Array.from(
      new Set(specialEquipment.map((item) => item.name)),
    ).map((name) => {
      const equipment = specialEquipment.find((e) => e.name === name);
      return {
        name: equipment.name,
        max_capacity: equipment.max_capacity || 1, // Mặc định số người tối đa là 1 nếu không được chỉ định
      };
    });

    try {
      await dataSource
        .createEntityManager()
        .save(EquipmentCategory, uniqueEquipment);
      console.log('Equipment seeding successful!');
    } catch (error) {
      console.error(error);
    }
  }
}
