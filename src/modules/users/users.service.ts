import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { GetListUsersDto } from './dto/get-list-users.dto';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { PageService } from '../pagination/page.service';

@Injectable()
export class UsersService extends PageService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
    queryBuilder.where('table.deleted_at is null');
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

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<PageResponseDto<User>> {
    const { email, password } = createUserDto;
    const user = this.usersRepository.create({
      email,
      password,
    });

    await this.usersRepository.save(user);
    return new PageResponseDto(user);
  }
}
