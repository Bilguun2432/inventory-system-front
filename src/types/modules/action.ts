import { ProductType } from "./product";

export interface ActionType {
  id: number;
  actionStatusId: string;
  authUserId: number;
  productId: number;
  unit: number;
  description: string;
  timeCreated: Date;

  Product?: ProductType;
}
