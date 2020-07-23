import {AttachmentUpload, AttachmentAdd} from 'core';
import {BaseInteractor} from './BaseInteractor';

export interface UploadAvatarService {
  upload: (file: AttachmentUpload) => Promise<AttachmentAdd>;
}

export interface UploadAvatarParams {
  file: AttachmentUpload;
}

export class UploadAvatarInteractor extends BaseInteractor<
  UploadAvatarService,
  UploadAvatarParams
> {
  excute(options: UploadAvatarParams): Promise<AttachmentAdd> {
    return this.getService().upload(options.file);
  }
}
