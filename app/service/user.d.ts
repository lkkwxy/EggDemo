import { Service } from 'egg';
import { User } from '../Dto/user';
export default class UserService extends Service {
    getUserByName(username: string): Promise<User | null>;
    register(params: {
        username: string;
        password: string;
        signature: string;
        avatar: string;
        ctime: string;
    }): Promise<EggMySQLInsertResult | null>;
    editUserInfo(params: User): Promise<EggMySQLUpdateResult | null>;
}
