import { Injectable, Logger } from '@nestjs/common';

enum errorMap {
  info = 0,
  warning = 1,
  error = 2,
}

@Injectable()
export class LoggingService extends Logger {

  logLevel = 0;

  async toLog(logType: 'info' | 'warning' | 'error', data: ReqData) {
    const logLevel = errorMap[logType];
    if (logLevel < this.logLevel) return;
    const dataToLog = `[Request] url: ${data.url
      }, query parameters: ${JSON.stringify(
        data.queryParams,
      )}, body: ${JSON.stringify(data.body)} [Response] status code: ${data.responseStatusCode
      }, message: ${data.message}`;
    if (logType === 'info') {
      await this.info(dataToLog);
    }
    if (logType === 'warning') {
      await this.warn(dataToLog);
    }
    if (logType === 'error') {
      await this.error(dataToLog);
    }
  }

  warn(message: any, context?: string) {
    super.warn(this.simplifyLogMessage(message), context);
  }

  error(message: any, trace?: string, context?: string) {
    super.error(this.simplifyLogMessage(message), trace, context);
  }

  info(message: any, context?: string) {
    super.log(this.simplifyLogMessage(message), context);
  }

  simplifyLogMessage(message: any): string {
    if (typeof message === 'object') {
      return JSON.stringify(message);
    }
    return message;
  }
}

export interface ReqData {
  url: string;
  queryParams: any;
  body: string;
  responseStatusCode: number;
  message: string | 'Message?';
}
