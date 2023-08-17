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
      this.info(dataToLog);
    }
    if (logType === 'warning') {
      this.warn(dataToLog);
    }
    if (logType === 'error') {
      this.error(dataToLog);
    }
  }

  async logUncaughtException() {
    this.error('Uncaught Exception');
  }

  async logUnhandledRejection() {
    this.error('Unhandled Rejection');
  }

  warn(message: any) {
    super.warn(this.simplifyLogMessage(message));
  }

  error(message: any) {
    super.error(this.simplifyLogMessage(message));
  }

  info(message: any) {
    super.log(this.simplifyLogMessage(message));
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
