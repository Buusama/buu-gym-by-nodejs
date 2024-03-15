import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PackagesService } from './packages.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { GetListPackagesDto } from './dto/get-list-packages.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { Package } from 'src/entities/package.entity';
import { CreatePackageDto } from './dto/create-package.dto';
import { EntityNotFoundErrorFilter } from 'src/exception_filters/entity-not-found-error.filter';

@ApiTags('packages')
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}
  // @Get()
  // @ApiOkResponse({ description: 'List all package' })
  // getPackages(
  //   @Query() getListPackagesDto: GetListPackagesDto,
  // ): Promise<PageResponseDto<Package>> {
  //   return this.packagesService.getPackages(getListPackagesDto);
  // }

  // @Post()
  // @ApiOkResponse({ description: 'Create package' })
  // createPackage(
  //   @Body() createPackageDto: CreatePackageDto,
  // ): Promise<PageResponseDto<Package>> {
  //   return this.packagesService.createPackage(createPackageDto);
  // }

  // @Get(':id')
  // @UseFilters(EntityNotFoundErrorFilter)
  // @ApiOkResponse({ description: 'Get package by id' })
  // async getPackage(@Query('id') id: number): Promise<PageResponseDto<Package>> {
  //   return this.packagesService.getPackage(id);
  // }

  // @Put(':id')
  // @UseFilters(EntityNotFoundErrorFilter)
  // @ApiOkResponse({ description: 'Update package by id' })
  // async updatePackage(
  //   @Query('id') id: number,
  //   @Body() updatePackageDto: CreatePackageDto,
  // ): Promise<PageResponseDto<Package>> {
  //   return this.packagesService.updatePackage(id, updatePackageDto);
  // }
}
