export interface RequestOtpService {
  requestOtpWithEmail: (email: string) => Promise<boolean>;
}

export class RequestOtpInteractor {
  requestOtpService: RequestOtpService;

  constructor(requestOtpService: RequestOtpService) {
    this.requestOtpService = requestOtpService;
  }

  requestOtp(email: string) {
    return this.requestOtpService.requestOtpWithEmail(email);
  }
}
