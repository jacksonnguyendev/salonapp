import {UserGender, UserType, UserStatus} from 'core/enums';
import {Attachment} from './Attachment';

export interface IUserData {
  id: string;
  avatar?: Attachment;
  userName: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  address: string;
  type: UserType;
  status: UserStatus;
  dateOfBirth: Date;
  gender: UserGender;
  createDate?: Date;
  lastModifiedDate?: Date;
}

export interface IUserDataEditable {
  avatar?: Attachment;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  dateOfBirth?: Date;
  gender?: UserGender;
}

export interface IUser {
  setData: (data: IUserData) => void;
  getData: () => IUserData;
}

export class User implements IUser {
  private data: IUserData;

  constructor(data: IUserData) {
    this.data = data;
  }

  setData(data: IUserData) {
    this.data = data;
  }

  getData() {
    return this.data;
  }
}
