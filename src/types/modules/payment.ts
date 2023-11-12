import { NameValueType, PaymentStateType } from "./common";

export interface PaymentCheckResultType {
  state: PaymentStateType;
  message: string;
  triggerProcess: boolean;
  invoiceId: number;
  extraInfo: NameValueType[];
}
