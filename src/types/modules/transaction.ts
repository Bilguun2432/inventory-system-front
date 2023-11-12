import { ProductType } from "./product";
import { TransactionStateType, PaymentStateType, DeliveryStateType } from "./common";

export interface TransactionType {
  id: number;
  transactionCode: string;
  authUserId: number;
  clientId: number;
  priceTotal: number;
  state: TransactionStateType;
  statePayment: PaymentStateType;
  timeCompleted: Date;
  timeCreated: Date;
}

export interface TransactionProductChargeType {
  id: number;
  transactionProductId: number;
  accNumber: string;
  productService: string;
  priceAmount: number;
  state: DeliveryStateType;
  pricePlanCode: string;
  chargeService: string;
}

export interface TransactionProductNumberType {
  id: number;
  transactionProductId: number;
  productService: string;
  accNumber: string;
  packageId: number;
  creditLimit: number;
  state: DeliveryStateType;
}

export interface TransactionProductSimType {
  id: number;
  transactionProductId: number;
  productService: string;
  accNumber: string;
  simType: string;
  iccid: string;
  state: DeliveryStateType;
}

export interface TransactionProductType {
  id: number;
  transactionId: number;
  priceUnit: number;
  timeCreated: Date;
  accNumber: string;
  productId: number;
  amount: number;
  priceTotal: number;
  state: DeliveryStateType;
  timeCompleted: Date | null;
  product?: ProductType | null;
  charge?: TransactionProductChargeType | null;
  number?: TransactionProductNumberType | null;
  sim?: TransactionProductSimType | null;
}

export interface TransactionInvoiceType {
  id?: number;
  transactionId: number;
  paymentChannel: string;
  paymentMethod: string;
  sessionId: string;
  invoiceDataId: string;
  amount: number;
  invoiceId: string;
  state: PaymentStateType;
  timeCreated: Date;
}
