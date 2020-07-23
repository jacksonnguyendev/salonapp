import {User, SignUpCredential} from '../entities';

export interface SignUpService {
  signUpWithCredential: (credential: SignUpCredential) => Promise<boolean>;
}

export class SignUpInteractor {
  signUpService: SignUpService;

  constructor(signUpService: SignUpService) {
    this.signUpService = signUpService;
  }

  signUp(credential: SignUpCredential) {
    return this.signUpService.signUpWithCredential(credential);
  }
}
