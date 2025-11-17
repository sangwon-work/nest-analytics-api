import { Module } from '@nestjs/common';
import { StoreAccessModule } from './store-access/store-access.module';

@Module({
  imports: [StoreAccessModule]
})
export class FeaturesModule {}