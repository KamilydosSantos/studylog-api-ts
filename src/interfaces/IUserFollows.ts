import { IUser } from "./IUser";

export interface IUserFollows {
  id: number;
  follower: IUser;
  following: IUser;
}