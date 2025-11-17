import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetStoreAccessDto {
  @ApiProperty({
    example: 1,
    description: '가맹점 일련번호',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  store_access_pkey: number;
}