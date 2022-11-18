import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import { Controller } from 'egg';
import moment from 'moment';

export default class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    let uploadDir = '';
    try {
      const file = ctx.request.files[0];
      const f = fs.readFileSync(file.filepath);
      const day = moment(new Date()).format('YYYYMMDD');
      const dir = path.join(this.config.userConfig.uploadDir, day);
      await mkdirp(dir);
      const date = Date.now();
      uploadDir = path.join(dir, date + path.extname(file.filename));
      console.log(uploadDir);
      fs.writeFileSync(uploadDir, f);
    } catch (error) {
      console.log(error);
    } finally {
      ctx.cleanupRequestFiles();
    }
    ctx.body = {
      code: 200,
      msg: '上传成功1',
      data: uploadDir.replace(/app/g, ''),
    };
  }
}
