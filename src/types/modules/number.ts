export interface NumberKindType {
  id: number;
  name: string;
  systemId: number;
  price: number;
  isSpecial: boolean;
  enabled: boolean;
}

export interface NumberKindPatternType {
  id: number;
  numberKindId: number;
  pattern: string;
  numberKind?: NumberKindType;
}

export interface NumberPrefixType {
  id: number;
  mainService: string;
  prefixValue: string;
  enabled: boolean;
  isDeleted: boolean;
}
