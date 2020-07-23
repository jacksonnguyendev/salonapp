export interface IResponseErrorType {
  errors?: [string];
  statusCode?: number;
  message: string;
}

export interface IResponseError {
  getErrorTitle: () => string;
  getErrorMessages: () => string[];
}

export class ResponseError {
  private data: IResponseErrorType;

  constructor(data: string | IResponseErrorType | Error) {
    if (data instanceof Error) {
      this.data = {
        message: data.message,
      };
    } else if (typeof data === 'string') {
      this.data = {
        message: data,
      };
    } else {
      this.data = data;
    }
  }

  getErrorTitle(): string {
    return this.data.message;
  }

  getErrorMessages() {
    return this.data.errors || [];
  }
}
