export type Login = {
  username: string;
  password: string;
  rememberPassword: boolean;
};

export type Register = {
  email: string;
  password: string;
  confirmPassword: string;
};
