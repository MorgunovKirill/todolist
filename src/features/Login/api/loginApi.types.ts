export type UserDataType = {
  id: number;
  email: string;
  login: string;
};

export type LoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type LoginTypeRequestType = LoginType & {
  captcha?: boolean;
};
