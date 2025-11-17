import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '../core/core.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../core/config/configuration';
import { FeaturesModule } from '../feature/feature.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 다른 모듈에서 별도의 설정없이 환경변수의 사용이 가능합니다.
      load: [configuration],
      envFilePath: [
        `${process.cwd()}/dist/core/config/env/.env.${process.env.NODE_ENV}`,
      ],
    }),
    CoreModule,
    FeaturesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
