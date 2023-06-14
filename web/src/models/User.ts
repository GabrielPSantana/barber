export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  store?: [];
};

export type UserLogin = {
  email: string;
  password: string;
};
