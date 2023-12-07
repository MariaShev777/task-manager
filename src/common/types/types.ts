type FieldErrorType = {
  error: string;
  field: string;
};

export type BaseResponseType<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
  fieldsErrors?: FieldErrorType[];
};

export type UserType = {
  id: number;
  email: string;
  login: string;
};
