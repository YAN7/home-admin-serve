import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
		const status = exception.getStatus();
		const err: any = exception.getResponse();
		const { constraints } = err?.message[0];
		const msgKeys = Reflect.ownKeys(constraints);
		const message = constraints[msgKeys[0]];
    response
      .status(status)
      .json({
        statusCode: status,
        message,
        data: null,
        success: false,
      });
  }
}
