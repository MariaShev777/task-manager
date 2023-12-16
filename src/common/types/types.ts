type FieldError = {
  error: string;
  field: string;
};

export type BaseResponse<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
  fieldsErrors?: FieldError[];
};

export type User = {
  id: number;
  email: string;
  login: string;
};
