import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { GetListUsersDto } from './dto/get-list-users.dto';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { PageService } from '../pagination/page.service';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class UsersService extends PageService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private s3Service: AwsService,
  ) {
    super();
  }

  async getUsers(
    getListUsersDto: GetListUsersDto,
  ): Promise<PageResponseDto<User>> {
    const queryBuilder = await this.paginate(
      this.usersRepository,
      getListUsersDto,
    );

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMeta = new PageMetaDto(getListUsersDto, itemCount);
    return new PageResponseDto(entities, pageMeta);
  }

  getUserById(id: number): Promise<PageResponseDto<User>> {
    return this.usersRepository.findOneBy({ id }).then((users) => {
      return new PageResponseDto(users);
    });
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async uploadAvatar(user_id: number, file: Express.Multer.File): Promise<any> {
    try {
      const uploadResult = await this.s3Service.uploadFile(
        file.originalname,
        file.buffer,
        file.mimetype,
        `Avatar/${user_id}/images`,
      );
      return uploadResult;
    } catch (error) {
      throw error;
    }
  }

  async createUser(
    createUserDto: CreateUserDto,
    avatar: Express.Multer.File,
  ): Promise<PageResponseDto<User>> {
    const { ...param } = createUserDto;
    const user = this.usersRepository.create(param);
    await this.usersRepository.save(user);
    if (avatar) {
      const uploadResult = await this.uploadAvatar(user.id, avatar);
      user.avatar = uploadResult.Location;
      await this.usersRepository.save(user);
    }
    return this.getUserById(user.id);
  }
}
