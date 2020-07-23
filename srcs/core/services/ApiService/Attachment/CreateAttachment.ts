import {axiosClient} from 'core/adapters';
import {AttachmentAdd, AttachmentUpload} from 'core';

export class CreateAttachment {
  async createAttachment(attachment: AttachmentUpload): Promise<AttachmentAdd> {
    try {
      const form = new FormData();
      form.append('attachment', attachment);

      const result = await axiosClient.post(`/Attachment`, form);

      const {
        key,
        fileName,
        filePath,
        fileSize,
        fileType,
        success,
      } = result.data;

      return {
        key,
        fileName,
        filePath,
        fileSize,
        fileType,
        success,
      };
    } catch (e) {
      throw e.response.data;
    }
  }
}
