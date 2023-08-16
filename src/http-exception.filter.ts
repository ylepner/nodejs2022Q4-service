import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService, ReqData } from './logging.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) { }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const message = exception.message || 'Internal server error';

    const logData: ReqData = {
      url: request.url,
      queryParams: request.query,
      body: JSON.stringify(request.body),
      responseStatusCode: status,
    };

    this.loggingService.logError(logData);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}
