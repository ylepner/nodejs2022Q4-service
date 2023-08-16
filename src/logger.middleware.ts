import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) { }

  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    res.on('finish', () => {
      this.logger.log('info', {
        url: req.baseUrl,
        queryParams: req.params,
        body: req.body,
        responseStatusCode: res.statusCode,
      });
    });
    next();
  }
}
