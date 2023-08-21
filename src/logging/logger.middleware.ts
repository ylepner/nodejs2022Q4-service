import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    res.on('finish', async () => {
      const data = {
        url: req.url,
        queryParams: req.params,
        body: req.body,
        responseStatusCode: res.statusCode,
        message: res.statusMessage,
      };
      if (res.statusCode >= 500) {
        await this.logger.toLog('error', data);
      } else if (res.statusCode >= 400 && res.statusCode < 500) {
        await this.logger.toLog('warn', data);
      } else {
        await this.logger.toLog('log', data);
      }
    });
    next();
  }
}
