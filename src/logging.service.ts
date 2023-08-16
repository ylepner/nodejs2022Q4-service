import { Injectable } from "@nestjs/common";
import { ParsedUrlQuery } from "querystring";

const errorMap = {
  info: 0,
  warning: 1,
  error: 2
}

@Injectable()
export class LoggingService {

  logLevel = 0;

  log(logType: 'info' | 'warning' | 'error', data: ReqData) {
    const logLevel = errorMap[logType];
    if (logLevel < this.logLevel) return;
    console.log(logType, data);
  }

  logError(data: ReqData) {
    this.log('error', data);
  }
}

export interface ReqData {
  url: string;
  queryParams: any;
  body: string;
  responseStatusCode: number;
}
