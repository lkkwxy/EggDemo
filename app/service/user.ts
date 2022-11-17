import { Service } from 'egg';
import { User } from '../Dto/user';
export default class UserService extends Service {
  async getUserByName(username: string): Promise<User | null> {
    const { app } = this;
    try {
      const result = (await app.mysql.select('User', { where: { username } })) as User[];
      return result.length ? result[0] : null;
    } catch (error) {
      return null;
    }
  }

  async register(params: { username: string; password: string; signature: string; avatar: string; ctime: string }) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('User', params);
      return result;
    } catch (error) {
      return null;
    }
  }

  async editUserInfo(params: User) {
    const { app } = this;
    try {
      const result = await app.mysql.update(
        'User',
        {
          ...params,
        },
        {
          id: params.id,
        }
      );
      return result;
    } catch (error) {
      return null;
    }
  }

  // async login(username: string, password: string): Promise<User | null> {
  //   const { app } = this;
  //   try {
  //     const result = (await app.mysql.select('User', { where: { username } })) as User[];
  //     if (result && result[0] && result[0].password == password) {
  //       return result[0];
  //     }
  //     return null;
  //   } catch (error) {
  //     return null;
  //   }
  // }
}
