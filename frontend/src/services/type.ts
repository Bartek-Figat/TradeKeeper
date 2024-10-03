export type Login = {
  username: string;
  password: string;
  rememberPassword: boolean;
};

export type Register = {
  email: string;
  firstName: string,
  lastName: string,
  password: string,
  confirmPassword: string,
  agreementToWebsitePolicy: boolean
};
