import {Credential} from '../entities';
import {ISessionData} from '../entities/Session';

export interface SignInService {
  signInWithCredential: (credential: Credential) => Promise<ISessionData>;
}

export class SignInInteractor {
  signInService: SignInService;

  constructor(signInService: SignInService) {
    this.signInService = signInService;
  }

  async signIn(credential: Credential) {
    return this.signInService.signInWithCredential(credential);
  }
}
