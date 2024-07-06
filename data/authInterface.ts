export interface loginResponse {
  status: Boolean;
  code: number;
  message: string;
  data: {
    uuid: string;
    name: string;
    username: string;
    profile_picture: string;
    user_type: string;
    email: string;
    status: Boolean;
    email_verified: Boolean;
    phone_number: string;
    createdAt: Date;
    updatedAt: Date;
  };
  tokens: {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  };
}

export interface registerResponse {
  status: Boolean;
  code: number;
  message: string;
  data: {
    name: string;
    email: string;
    user_type: string;
    uuid: string;
    status: number;
    email_verified: number;
    updatedAt: string;
    createdAt: string;
  };
}
