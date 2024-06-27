export type Login = {
  email: string;
  password: string;
  matchPassword: string;
};

export type Register = {
  email: string;
  firstName: string,
  lastName: string,
  password: string,
  confirmPassword: string,
  agreementToWebsitePolicy: boolean
};
