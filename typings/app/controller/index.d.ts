// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportUpload from '../../../app/controller/upload';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    upload: ExportUpload;
    user: ExportUser;
  }
}
