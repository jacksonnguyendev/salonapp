import {User} from '../entities';

export interface AuthorizeService {
  getUserData: () => Promise<User>;
}

export class AuthorizeInteractor {
  authorizeService: AuthorizeService;

  constructor(authorizeService: AuthorizeService) {
    this.authorizeService = authorizeService;
  }

  async authorize() {
    return this.authorizeService.getUserData();
  }
}
