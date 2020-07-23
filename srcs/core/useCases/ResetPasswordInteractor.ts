import {ResetPasswordCredentialData} from '../entities';

export interface ResetPasswordService {
  resetPasswordWithOtp: (
    credential: ResetPasswordCredentialData,
  ) => Promise<boolean>;
}

export class ResetPasswordInteractor {
  resetPasswordService: ResetPasswordService;

  constructor(requestOtpService: ResetPasswordService) {
    this.resetPasswordService = requestOtpService;
  }

  resetPassword(credential: ResetPasswordCredentialData) {
    return this.resetPasswordService.resetPasswordWithOtp(credential);
  }
}
