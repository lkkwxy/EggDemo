import { Controller } from 'egg';
export default class HomeController extends Controller {
    index(): Promise<void>;
    user(): Promise<void>;
    add(): Promise<void>;
    test(): Promise<void>;
}
