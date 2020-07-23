export interface LogoutService {
  logout: () => Promise<boolean>;
}

export class LogoutInteractor {
    logoutService: LogoutService;

  constructor(logoutService: LogoutService) {
    this.logoutService = logoutService;
  }

  logout() {
    return this.logoutService.logout();
  }
}
