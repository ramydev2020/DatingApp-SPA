export interface ResponseResultDto {
  Message: string;
  ReferenceCode: string;
  StatusCode: string;
  StatusName: string;
    
  }
  export class ResponseResult<T> {
    result: T;
    ResponseResultDto: ResponseResultDto;
}

 