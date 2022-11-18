import { Controller } from 'egg';
export default class UploadController extends Controller {
    upload(): Promise<void>;
}
