import { Controller } from 'egg';
export default class UserController extends Controller {
    register(): Promise<void>;
    login(): Promise<void>;
    /**
     * getUserInfo
     */
    getUserInfo(): Promise<void>;
    editUserInfo(): Promise<void>;
}
