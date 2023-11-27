import { AuthRoleType } from "./auth_role";

export interface AuthUserType {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  authRoleId: number;
  timeCreated?: Date;

  authRole: AuthRoleType;
}
