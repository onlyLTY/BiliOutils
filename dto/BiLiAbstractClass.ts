export abstract class ApiAbstract {
  'code': number;
  'message': string;
  'ttl': number;
  abstract data?: object | number;
}

export abstract class AccountAbstract {
  'code': number;
  'status': boolean;
  abstract data?: object;
}
