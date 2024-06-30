export interface SendVerificationEmailData {
    email: string | undefined;
    password?: string;
    authToken: string;
    isVerified?: boolean;
    dateAdded?: Date;
    lastLoggedIn?: null;
    logOutDate?: null;
    isLogin?: boolean;
    agreementToWebsitePolicy?: boolean;
  }