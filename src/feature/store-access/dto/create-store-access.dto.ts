import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStoreAccessDto {
  @ApiProperty({
    example: '가맹점 이름',
    description: '등록할 가맹점 이름',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  store_name: string;

  @IsOptional()
  @IsString()
  store_key: string = '';

  @IsOptional()
  @IsString()
  store_secret_key: string = '';
}
