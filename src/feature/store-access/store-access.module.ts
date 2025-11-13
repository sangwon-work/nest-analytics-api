import { Module } from '@nestjs/common';
import { StoreAccessService } from './service/store-access.service';
import { StoreAccessController } from './store-access.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreAccess } from './entities/store-access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoreAccess])],
  controllers: [StoreAccessController],
  providers: [StoreAccessService],
})
export class StoreAccessModule {}
