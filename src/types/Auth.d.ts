import { TUser } from './User';

export type TAuth = {
  authToken: string | null;
  user: TUser | null;
};
