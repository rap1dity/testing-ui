import { Gender } from 'common/types/gender.type';

export interface IUserData {
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber: string;
  gender: Gender;
}