import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { StoreAccessService } from './service/store-access.service';
import { CreateStoreAccessDto } from './dto/create-store-access.dto';
import { UpdateStoreAccessDto } from './dto/update-store-access.dto';
import { respond } from '../../shared/utils/response/response';

@Controller('store-access')
export class StoreAccessController {
  constructor(private readonly storeAccessService: StoreAccessService) {}

  @Post()
  @HttpCode(200)
  create(@Body() createStoreAccessDto: CreateStoreAccessDto) {
    this.storeAccessService.create(createStoreAccessDto);
    return respond('0000', '', {})
  }

  @Get()
  findAll() {
    this.storeAccessService.findAll();
    return respond('0000', '', {})
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.storeAccessService.findOne(+id);
    return respond('0000', '', {})
  }

  @Patch()
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateStoreAccessDto: UpdateStoreAccessDto) {
    this.storeAccessService.update(updateStoreAccessDto);
    return respond('0000', '', {})
  }

  @Delete()
  remove(@Param('id') id: string) {
    this.storeAccessService.remove(+id);
    return respond('0000', '', {})
  }
}
