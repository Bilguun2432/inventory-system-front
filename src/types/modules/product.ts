export interface ProductCategoryType {
  id: number;
  name: string;
  description?: string;
  enabled?: boolean;
  timeCreated?: Date;
}

export interface ProductConfType {
  id: number;
  name?: string;
  description?: string;
  serviceType?: string;
  numberCheck: boolean;
  chargeService?: string;
}

export interface ProductCompletionType {
  id: number;
  name: number;
  productService: string;
  description: string;
}

export interface ProductCompletionStepType {
  id: number;
  name: number;
  description: string;
  productCompletionId: number;
  productService: string;
  chargeService: string;
  orderIndex: number;
  timeCreated: Date;
}

export interface ProductNumberCheckType {
  id?: number;
  name: string;
  description?: string;
  fieldType: string;
  packageCode: string;
  numberPrefix: string | null;
  relateType: string;
  enabled: boolean;
}

export interface ProductImageType {
  id: number;
  imageType: string;
  filePath: string;
}

export interface ProductTranslateType {
  productId: number;
  lang: string;
  name: string;
  description: string;
}

export interface ProductType {
  id: number;
  categoryId?: number;
  name: string;
  description?: string;
  packageCode?: string;
  productConfId: number;
  productCompletionId: number;
  enabled: boolean;
  price: number;
  timeCreated: Date;

  productCompletion?: ProductCompletionType;
  productConf?: ProductConfType;
  translates?: ProductTranslateType[];
  images?: ProductImageType[];
}

export interface TranslateDefaultType {
  name: string;
  description: string;
}

export interface ProductAttributeType {
  id: number;
  systemField: string;
  priceExtra: number;
  translates: TranslateDefaultType[];
}
