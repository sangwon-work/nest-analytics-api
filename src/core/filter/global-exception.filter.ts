import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const resp = exception.getResponse();

      const message =
        typeof resp === 'string'
          ? resp
          : Array.isArray((resp as any)?.message)
            ? (resp as any).message.join(', ')
            : ((resp as any)?.message ?? exception.message);

      return response.status(status).json({
        res_code: String(status),
        message: message ?? HttpStatus[status] ?? 'Error',
        data: null,
      });
    }

    response.status(500).json({
      res_code: '9999',
      message: (exception as Error).message || 'Internal server error',
    });
  }
}