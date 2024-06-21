export type FieldErrorType = {
  error: string;
  field: string;
};

export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: FieldErrorType[];
  data: D;
};

export type BaseAction<T extends (...args: any) => any> = Omit<
  ReturnType<T>,
  "meta"
>;

export type rejectedValueOrSerializedError = {
  messages: Array<string>;
  fieldsErrors: FieldErrorType[];
};
