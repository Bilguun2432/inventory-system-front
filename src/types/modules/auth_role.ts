import { AuthPermissionType } from "./auth_permission";

export interface AuthRoleType {
  id: number;
  name: string;
  description: string;
  permissions?: [AuthPermissionType];
}
