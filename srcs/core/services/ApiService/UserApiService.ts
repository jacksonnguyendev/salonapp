import {
  Credential,
  User,
  SignUpCredential,
  ResetPasswordCredentialData,
  IUserData,
  IUserDataEditable,
} from '../../entities';
import {axiosClient} from '../../adapters';
import {SignInService} from '../../useCases';
import {SignUpService} from '../../useCases/SignUpInteractor';
import {AuthorizeService} from '../../useCases/AuthorizeInteractor';
import {ISessionData} from '../../entities/Session';
import {RequestOtpService} from '../../useCases/RequestOtpInteractor';
import {ResetPasswordService} from '../../useCases/ResetPasswordInteractor';
import {LogoutService} from '../../useCases/LogoutInteractor';
import {UpdateProfileService} from '../../useCases/UserUpdateProfileInteractor';
import { UserGender, UserType, UserStatus } from 'core/enums';

export class UserApiService
  implements
    SignInService,
    SignUpService,
    AuthorizeService,
    RequestOtpService,
    ResetPasswordService,
    LogoutService,
    UpdateProfileService {
  async signInWithCredential(credential: Credential): Promise<ISessionData> {
    try {
      const data = credential.getData();
      const result = await axiosClient.post('/Auth/login', data);
      return {
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
      };
    } catch (e) {
      throw e.response.data;
    }
  }

  async signUpWithCredential(credential: SignUpCredential): Promise<boolean> {
    try {
      const data = credential.getData();
      await axiosClient.post('/Auth/register', data);
      return true;
    } catch (e) {
      throw e.response.data;
    }
  }

  async getUserData(): Promise<User> {
    try {
      const result = await axiosClient.get<IUserData>('/User/profile');

      return new User({
        id: result.data?.id || '',
        userName: result.data?.userName || '',
        email: result.data?.email || '',
        phoneNumber: result.data?.phoneNumber || '',
        firstName: result.data?.firstName || '',
        lastName: result.data?.lastName || '',
        address: result.data?.address || '',
        status:  result.data?.status || UserStatus.Active,
        type:  result.data?.type || UserType.Customer,
        dateOfBirth: result.data?.dateOfBirth || new Date(),
        gender: result.data?.gender || UserGender.Male,
        avatar: result.data?.avatar,
      });
    } catch (e) {
      console.log(e, 'oke')
      throw e.response.data;
    }
  }

  async requestOtpWithEmail(email: string): Promise<boolean> {
    try {
      const result = await axiosClient.post(`/Auth/otp?email=${email}`);
      return true;
    } catch (e) {
      throw e.response.data;
    }
  }

  async resetPasswordWithOtp(
    credential: ResetPasswordCredentialData,
  ): Promise<boolean> {
    try {
      const result = await axiosClient.post(
        '/Auth/forgot-Password',
        credential,
      );
      return true;
    } catch (e) {
      throw e.response.data;
    }
  }

  async logout(): Promise<boolean> {
    try {
      await axiosClient.delete('/User/logout');
      return true;
    } catch (e) {
      throw e.response.data;
    }
  }

  async updateProfile(
    userId: number,
    data: IUserDataEditable,
  ): Promise<boolean> {
    try {
      await axiosClient.patch(`/User/${userId}`, data);
      return true;
    } catch (e) {
      throw e.response.data;
    }
  }
}
