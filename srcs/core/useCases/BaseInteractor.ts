export interface IBaseInteractor<Service, ExcuteParams> {
  excute: (options: ExcuteParams) => any;
}

export class BaseInteractor<Service, ExcuteParams>
  implements IBaseInteractor<Service, ExcuteParams> {
  private service: Service;

  constructor(service: Service) {
    this.service = service;
  }

  getService(): Service {
    return this.service;
  }

  excute(options: ExcuteParams): any {
    return "Empty excute" + options;
  }
}
