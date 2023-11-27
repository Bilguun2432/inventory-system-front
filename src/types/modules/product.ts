export interface ProductCategoryType {
  id: number;
  name: string;
  description?: string;
  enabled?: boolean;
  timeCreated?: Date;
}

export interface ProductImageType {
  id: number;
  imageType: string;
  filePath: string;
}

export interface ProductType {
  id: number;
  categoryId?: number;
  name: string;
  description?: string;
  enabled: boolean;
  price: number;
  unit: number;
  timeCreated: Date;
  imagePath?: string;

  category: ProductCategoryType;
}
