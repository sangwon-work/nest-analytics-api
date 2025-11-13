// transform.interface.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseType } from '../../shared/utils/response/api-response.type';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponseType<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponseType<T>> {

    // 특정 경로 또는 메서드 제외
    const req = context.switchToHttp().getRequest();
    if (req.url.includes('')) {
      return next.handle();
    } else {
      return next.handle().pipe(
        map((data) => {
          return {
            res_code: data.res_code,
            message: data.message,
            body: data.body ?? {},
          };
        }),
      );
    }
  }
}
