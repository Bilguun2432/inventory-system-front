export interface AuthUserType {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  userType: string;
  // password: string;
  timeCreated?: Date;
}
