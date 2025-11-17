import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode, Query,
} from '@nestjs/common';
import { StoreAccessService } from './service/store-access.service';
import { CreateStoreAccessDto } from './dto/create-store-access.dto';
import { UpdateStoreAccessDto } from './dto/update-store-access.dto';
import { respond } from '../../shared/utils/response/response';
import { GetStoreAccessDto } from './dto/get-store-access.dto';
import { ApiOperation } from '@nestjs/swagger';
import { RegisterStoreFacadeService } from './facade/register-store.facade.service';

@Controller('store-access')
export class StoreAccessController {
  constructor(
    private readonly storeAccessService: StoreAccessService,
    private readonly registerStoreFacadeService: RegisterStoreFacadeService,
  ) {}

  /**
   * 가맹점 목록 조회
   */
  @Get('/list')
  @ApiOperation({ summary: '가맹점 목록 조회' })
  findAll() {
    this.storeAccessService.findAll();
    return respond('0000', '', { accessStoreList: [] })
  }

  /**
   * 가맹점 상세 조회
   * @param getStoreAccessDto
   */
  @Get('')
  @ApiOperation({ summary: '가맹점 상세 조회' })
  findOne(@Query() getStoreAccessDto: GetStoreAccessDto) {
    this.storeAccessService.findOne(getStoreAccessDto.store_access_pkey);
    return respond('0000', '', {})
  }

  /**
   * 가맹점 등록
   * @param createStoreAccessDto
   */
  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: '가맹점 등록' })
  async create(@Body() createStoreAccessDto: CreateStoreAccessDto) {
    const { store_access_pkey } = await this.registerStoreFacadeService.registerStoreFacade(createStoreAccessDto);
    return respond('0000', '', { store_access_pkey: store_access_pkey });
  }

  /**
   * 가맹점 수정
   * @param id
   * @param updateStoreAccessDto
   */
  @Patch()
  @HttpCode(200)
  @ApiOperation({ summary: '가맹점 수정' })
  update(@Param('id') id: string, @Body() updateStoreAccessDto: UpdateStoreAccessDto) {
    this.storeAccessService.update(updateStoreAccessDto);
    return respond('0000', '', {})
  }
}
