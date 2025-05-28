import Fakerator from 'fakerator';
import { Gender } from '@common/types/gender.type';

const fakerator = Fakerator();

export default class UserCreator {
  static createUser() {
    const genders: Gender[] = ['Male', 'Female', 'Other'];
    const randomIndex = fakerator.random.number(0, 2);
    const firstName = fakerator.names.firstName();
    const lastName = fakerator.names.lastName();

    return {
      firstName: firstName,
      lastName: lastName,
      userName: `${firstName} ${lastName}`,
      phoneNumber: `${fakerator.random.number(1000000000, 9999999999)}`,
      gender: genders[randomIndex],
    };
  }
}