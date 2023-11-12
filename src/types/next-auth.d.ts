import { SessionDataType } from "./auth-user";

declare module "next-auth" {
  interface Session {
    status: string;
    data: SessionDataType;
  }
}
