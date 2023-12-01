export type ResponseType<D = {}> = {
  data: D;
  messages: string[];
  fieldsErrors: string[];
  resultCode: number;
};

export type UserType = {
  id: number;
  email: string;
  login: string;
};
