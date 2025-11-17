import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GlobalExceptionFilter } from './core/filter/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { ApiAccessLogInterceptor } from './core/interceptor/api-access-log.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 활성화
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // decorator(@)가 없는 속성이 들어오면 해당 속성은 제거하고 받아들입니다.
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 값이 넘어오면 request 자체를 막습니다. true인 경우) 정의되지 않은 property를 전송하려고 하면 다음과 같이 400 에러가 뜹니다.
      transform: true, // 클라이언트에서 값을 받자마자 타입을 정의한대로 자동 형변환을 합니다.
      disableErrorMessages: false,
      transformOptions: { enableImplicitConversion: true }, // 암묵적으로 타입을 변환 시켜줌
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new ApiAccessLogInterceptor());

  const options = new DocumentBuilder()
    .setTitle('analytics API Documentation')
    .setDescription('analytics API Documentation')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local environment')
    .addTag('DocumentBuilder')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
