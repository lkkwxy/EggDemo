import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import { Controller } from 'egg';

export default class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    let uploadDir = '';
    try {
      let file = ctx.request.files[0];
      let f = fs.readFileSync(file.filepath);
      let dir = path.join(this.config.userConfig.uploadDir, '20221117');
      await mkdirp(dir);
      let date = Date.now();
      uploadDir = path.join(dir, date + path.extname(file.filename));
      console.log(uploadDir);
      fs.writeFileSync(uploadDir, f);
    } catch (error) {
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
