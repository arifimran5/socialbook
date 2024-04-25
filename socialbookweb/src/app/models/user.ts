export type RegisterUser = {
  username: string;
  email: string;
  password: string;
  profile: {
    bio?: string;
    dob?: string;
  };
};

export type LoginUser = {
  username: string;
  password: string;
};
