// for upload
export type AttachmentUpload = {
  uri: string;
  name: string;
  type: string;
};

// for post
export type AttachmentAdd = {
  key: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  fileType: string;
  success: boolean;
};
// full model
export type Attachment = AttachmentAdd & {
  id: number;
  createDate: Date;
  lastModifiedDate: Date;
  refId: string;
  refType: string;
};
