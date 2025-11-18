import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class GetStoreAccessListDto {
  @ApiProperty({
    example: '',
    description: '가맹점 이름',
    required: false,
  })
  @IsOptional()
  @IsString()
  store_name: string = '';

  @ApiProperty({
    example: 1,
    description: '페이지 번호',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  page: number;

  @ApiProperty({
    example: 30,
    description: '페이지별 노출 개수',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsIn([30, 50, 100])
  limit: 30 | 50 | 100;
}
