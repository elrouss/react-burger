export interface IUser {
  email: string;
  name: string;
}

export interface IAccessToken {
  id: string;
  exp: number;
  iat: number;
}

export interface IUserRegistration extends IUser {
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserEditInfo extends IUser {
  password?: string;
}

export interface IUserAuthResponse {
  success: true;
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IUserEditInfoResponse {
  success: true;
  user: IUser;
}

export interface IUserLogoutResponse {
  success: true;
  message: 'Successful logout';
}

export interface IUserErrorResponse {
  success: false;
  message: string;
}
