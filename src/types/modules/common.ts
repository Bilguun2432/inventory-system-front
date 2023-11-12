export enum TransactionStateType {
  OPEN = "OPEN",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export enum PaymentStateType {
  NOT_PAID = "NOT_PAID",
  PENDING = "PENDING",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED",
  PAID = "PAID",
  DECLINED = "DECLINED",
  CANCELED = "CANCELED",
  REFUNDING = "REFUNDING",
  REFUNDED = "REFUNDED",
}

export enum DeliveryStateType {
  NOT_FULFILLED = "NOT_FULFILLED",
  FULFILLED = "FULFILLED",
}

export enum TransactionProductActionType {
  FULFILL = "FULFILL",
}

export enum TransactionInvoiceActionType {
  CHECK_PAYMENT_STATE = "CHECK_PAYMENT_STATE",
}

export interface NameValueType {
  name: string;
  value: string;
}

export enum SortTypeEnum {
  asc = "asc",
  desc = "desc",
}

export interface SortModelType {
  field?: string;
  sortType?: SortTypeEnum;
}

export interface PaginationModelType {
  page: number;
  size: number;
  totalItems?: number;
}
