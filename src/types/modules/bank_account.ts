export interface BankAccountType {
  id: number;
  clientId: number;
  integrateKey: string;
  accountNumber: string;
  userCreatedId?: number;
  timeCreated?: Date;
}
