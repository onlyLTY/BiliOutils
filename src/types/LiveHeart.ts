export type LiveHeartRuleId = [number, number, number, number];
export type DeviceType = [string, string];

export interface LiveHeartERequest {
  id: string;
  device: string;
  ts: number;
  is_patch: number;
  heart_beat: string;
  ua: string;
  visit_id: string;
  csrf: string;
  csrf_token: string;
}

export interface HmacsData {
  id: string;
  device: string;
  ets: number;
  benchmark: string;
  time: number;
  ts: number;
  ua: string;
}

export interface LiveHeartXRequest extends HmacsData {
  csrf: string;
  csrf_token: string;
  visit_id: string;
  s: string;
}

export interface HeartBaseDateType {
  ua: string;
  id: LiveHeartRuleId;
  csrf_token: string;
  csrf: string;
  device: DeviceType;
  uname: string;
}
