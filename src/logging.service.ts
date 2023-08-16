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
    console.log(data);
  }
}

export interface ReqData {
  url: string;
  queryParams: { [key: string]: string } | undefined;
  body: string;
  responseStatusCode: number;
}
