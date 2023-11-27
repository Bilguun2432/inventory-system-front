import { ProductType } from "./product";

export interface AuthUserProductType {
  id: number;
  productId: number;
  unit: number;
  timeCreated: Date;
  userId: number;

  product?: ProductType;
}
