import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class ApiAccessLogInterceptor implements NestInterceptor {
  constructor(
  ) {}

  /**
   * cms api 요청/응답 로그 저장 interceptor
   * @param context
   * @param next
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const start_at = new Date();
    const req_at = dayjs().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss'); // 요청시각

    return next.handle().pipe(
      tap(async (data) => {
        const resat = dayjs().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss'); // 응답시각
        try {

          const url = req.originalUrl || req.url;
          const path = url.split('?')[0]; // end-point
          const end_at = new Date();
          const response_time = end_at.getTime() - start_at.getTime(); // 총 응답 시간 (6ms 정도 오차 발생)
          const request_query = JSON.stringify(req.query ?? {} ); // 요청 쿼리스트링
          const request_data = JSON.stringify(safeBody(req.body)); // 요청 body
          const res_code = data.res_code;
          const message = data.message;
          if (path !== '/') {

          }
        } catch (error) {
          // 로깅 실패는 서비스에 영향 주지 않도록 무시
          console.error(error);
        }
      }),
    );
  }
}

function safeBody(body: any) {
  try {
    if (!body) return {};
    const s = JSON.stringify(body);
    return s.length > 8000 ? { _truncated: true } : body;
  } catch {
    return { _string: String(body).slice(0, 2000) };
  }
}
