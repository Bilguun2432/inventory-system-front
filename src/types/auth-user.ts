export interface SessionUserType {
  email: string;
}

export interface SessionDataType {
  user: SessionUserType;
  tokens: {
    access: string;
    refresh: string;
  };
}
