export interface FileType {
  id?: number;
  service: string;
  serviceId: number;
  idNestLevel: number;
  fileType: string;
  name: string;
  fileName: string;
  extension: string;
  timeCreated?: Date;
}
