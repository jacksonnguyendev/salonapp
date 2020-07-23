import {translate} from '../utils';
import {IUserData} from './User';
import {isValidPassword} from '../utils/validate';
import { UserType } from 'core/enums';

export interface ICredential {
  username: string;
  password: string;
}

export class Credential implements ICredential {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    // if (!isValidPassword(password)) {
    //   throw new Error(translate('errors.INVALID_PASSWORD'));
    // }

    this.username = username;
    this.password = password;
  }

  getData() {
    return {
      username: this.username,
      password: this.password,
    };
  }
}

export interface SignUpCredentialType {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  agreeWithTerms: boolean;
  type: UserType;
}

export class SignUpCredential {
  private data: SignUpCredentialType;

  constructor(data: SignUpCredentialType) {
    if (!isValidPassword(data.password)) {
      throw new Error(translate('errors.INVALID_PASSWORD'));
    }

    this.data = data;
  }

  getData() {
    return this.data;
  }
}

export class AuthorizeCredential {
  private accessToken: string;
  private refreshToken: string;

  constructor(accessToken: string, refreshtoken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshtoken;
  }

  public getData() {
    return {
      accessToken: this.accessToken,
      refreshtoken: this.refreshToken,
    };
  }
}

export interface ResetPasswordCredentialData {
  otpCode: string;
  email: string;
  newPassword: string;
  confirmNewPassword: string;
}

export class ResetPasswordCredential {
  data: ResetPasswordCredentialData;

  constructor(data: ResetPasswordCredentialData) {
    this.data = data;
  }

  public getData() {
    return this.data;
  }
}
