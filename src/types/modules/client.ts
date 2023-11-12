import { ProductType } from "./product";

export interface ClientKindType {
  id: number;
  name: string;
  description: string;
  userCreatedId?: number;
  timeCreated: Date;
}

export interface ClientType {
  id: number;
  clientKindId?: number;
  name: string;
  description?: string;
  userCreatedId?: number;
  timeCreated: Date;
  clientKind?: ClientKindType;
}

export interface ClientAccountType {
  id: number;
  clientId: number;
  accountNumber: string;
  balance: number;
  state: string;
  description: string;
  userCreatedId: number;
  timeCreated: Date;
}

export interface ClientAccountAdd {
  id: number;
  clientId: number;
  accountNumber: string;
}

export interface ClientAccountTransactionType {
  id: number;
  clientAccountId: number;
  transactionCode: string;
  transactionId: number;
  amount: number;
  balanceAfter: number;
  state: number;
  timeCreated: Date;
}

export interface ClientProductType {
  id: number;
  clientId: number;
  productId: number;
  product: ProductType;
  useCustomPrice: boolean;
  price: number;
  // userCreatedId?: number;
  timeCreated: Date;
}
