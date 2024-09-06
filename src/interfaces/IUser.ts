export interface IUser {
  id: number;
  name: string;
  userName: string;
  email: string;
  password: string;
  bio?: string;
  profilePicture?: string | null;
  coverPicture?: string | null;
}