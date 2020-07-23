import {CreateAttachment} from './CreateAttachment';
import {AttachmentUpload, UploadAvatarService} from 'core';

export class AttachmentApiService extends CreateAttachment
  implements UploadAvatarService {
  upload(file: AttachmentUpload) {
    return this.createAttachment(file);
  }
}
