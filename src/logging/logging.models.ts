export interface ReqData {
  url: string;
  queryParams: any;
  body: string;
  responseStatusCode: number;
  message: string | 'Message?';
}


export enum logsMap {
  error = 1,
  warn = 2,
  log = 3,
  debug = 4,
  verboose = 5,
}