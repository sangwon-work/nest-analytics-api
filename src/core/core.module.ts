import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 다른 모듈에서 별도의 설정없이 환경변수의 사용이 가능합니다.
      load: [configuration],
      envFilePath: [
        `${process.cwd()}/dist/core/config/env/.env.${process.env.NODE_ENV}`,
      ],
    }),
    DatabaseModule,
  ]
})
export class CoreModule {}