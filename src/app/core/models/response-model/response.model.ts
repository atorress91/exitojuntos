export class Response<T = any> {
  success: boolean;
  data: T;
  message: string;
  code: number;
  errors: any;
}
