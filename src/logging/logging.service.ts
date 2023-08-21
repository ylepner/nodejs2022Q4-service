import { Injectable, Logger } from '@nestjs/common';
import { writeToErrorFile, writeToFile } from './utils';
import { ReqData, logsMap } from './logging.models';

@Injectable()
export class LoggingService extends Logger {
  readonly logLevelEnv = Number(process.env.API_LOG_LEVEL) || 1;

  async toLog(
    logType: 'error' | 'warn' | 'log' | 'verboose' | 'debug',
    data: ReqData,
  ) {
    const logLevel = logsMap[logType];
    if (logLevel > this.logLevelEnv) return;
    const dataToLog = `[Request] url: ${data.url
      }, query parameters: ${JSON.stringify(
        data.queryParams,
      )}, body: ${JSON.stringify(data.body)} [Response] status code: ${data.responseStatusCode
      }, message: ${data.message}`;
    if (logType === 'log') {
      this.info(dataToLog);
    }
    if (logType === 'warn') {
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

  async warn(message: any) {
    await writeToFile(message);
    super.warn(this.simplifyLogMessage(message));
  }

  async error(message: any) {
    await writeToErrorFile(message);
    super.error(this.simplifyLogMessage(message));
  }

  async info(message: any) {
    await writeToFile(message);
    super.log(this.simplifyLogMessage(message));
  }

  simplifyLogMessage(message: any): string {
    if (typeof message === 'object') {
      return JSON.stringify(message);
    }
    return message;
  }
}
