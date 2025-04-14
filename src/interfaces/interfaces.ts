export interface IData_SnippetNews {
  ID: number;
  TI: string;
  AB: string;
  URL: string;
  DOM: string;
  DP: string;
  LANG: string;
  REACH: number;
  KW: IData_TagItem[];
  AU: string[];
  CNTR: string;
  CNTR_CODE: string;
  SENT: string;
  TRAFFIC: IData_TrafficItem[];
  FAV: string;
  HIGHLIGHTS: string[];
}

export interface IData_TagItem {
  value: string;
  count: number;
}

export interface IData_TrafficItem {
  value: string;
  count: number;
}
