import {IUserDataEditable} from '../entities';

export interface UpdateProfileService {
  updateProfile: (userId: number, data: IUserDataEditable) => Promise<boolean>;
}

export class UserUpdateProfileInteractor {
  updateProfileService: UpdateProfileService;

  constructor(updateProfileService: UpdateProfileService) {
    this.updateProfileService = updateProfileService;
  }

  updateProfile(userId: number, data: IUserDataEditable) {
    return this.updateProfileService.updateProfile(userId, data);
  }
}
