import { IApiRoot, ITimestamps } from "../Api";

export interface IUser extends ITimestamps {
  name: string;
  email: string;
}

export interface IUserLogin extends IApiRoot {
  data: {
    token: string;
    user: IUser;
  };
}
