import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PackagesService } from './packages.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { GetListPackagesDto } from './dto/get-list-packages.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { Package } from 'src/entities/package.entity';
import { CreatePackageDto } from './dto/create-package.dto';

@ApiTags('packages')
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) { }
  @Get()
  @ApiOkResponse({ description: 'List all package' })
  getPackages(
    @Query() getListPackagesDto: GetListPackagesDto,
  ): Promise<PageResponseDto<Package>> {
    return this.packagesService.getPackages(getListPackagesDto);
  }

  @Post()
  @ApiOkResponse({ description: 'Create package' })
  createPackage(@Query() createPackageDto: CreatePackageDto): Promise<PageResponseDto<Package>> {
    return this.packagesService.createPackage(createPackageDto);
  }
}
