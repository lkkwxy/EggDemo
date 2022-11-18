import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  public async user() {
    const { ctx } = this;
    const { id } = ctx.params; // 通过 params 获取申明参数
    ctx.body = id;
  }
  async add() {
    const { ctx } = this;
    const { title } = ctx.request.body;
    // Egg 框架内置了 bodyParser 中间件来对 POST 请求 body 解析成 object 挂载到 ctx.request.body 上
    ctx.body = {
      title,
    };
  }
  async test() {
    const { ctx } = this;
    // 通过 token 解析，拿到 user_id
    const token = ctx.request.header.token; // 请求头获取 authorization 属性，值为 token
    // 通过 app.jwt.verify + 加密字符串 解析出 token 的值
    if (typeof token === 'string') {
      const decode = ctx.getUser();
      console.log(typeof decode);
      ctx.body = {
        code: 200,
        message: '获取成功',
        data: decode,
      };
      return;
    }

    // 响应接口
    ctx.body = {
      code: 201,
      message: '获取成功',
      data: null,
    };
  }
}
