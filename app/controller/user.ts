import { Controller } from 'egg';
import { User } from '../Dto/user';
const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png';
export default class UserController extends Controller {
  public async register() {
    const { ctx } = this;
    const { password, username } = ctx.request.body;
    if (!password || !username) {
      ctx.body = {
        code: 500,
        msg: '账号或密码不能为空',
        data: null,
      };
      return;
    }
    const user = await ctx.service.user.getUserByName(username);
    if (user && user.id) {
      ctx.body = {
        code: 500,
        msg: '用户已存在',
        data: null,
      };
      return;
    }
    const result = await ctx.service.user.register({
      username,
      password,
      signature: '去你妹的',
      avatar: defaultAvatar,
      ctime: new Date().getTime() + '',
    });
    if (result) {
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: null,
      };
    } else {
      ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null,
      };
    }
  }

  public async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const user = await ctx.service.user.getUserByName(username);
    if (user) {
      if (user.password === password) {
        // const token = app.jwt
        const token = app.jwt.sign(
          {
            id: user.id,
            username,
            exp: Math.floor(Date.now() / 1000 + 24 * 3600),
          },
          app.config.jwt.secret
        );
        ctx.body = { code: 200, msg: '登录成功', data: { token } };
      } else {
        ctx.body = {
          code: 500,
          msg: '用户名或密码错误',
          data: null,
        };
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '用户不存在',
        data: null,
      };
    }
  }

  /**
   * getUserInfo
   */
  public async getUserInfo() {
    const { ctx } = this;
    const user = ctx.getUser();
    const userInfo = (await ctx.service.user.getUserByName(user.username)) as User;
    const { password, avatar, ...otherInfo } = userInfo;
    ctx.body = {
      code: 200,
      msg: 'success',
      data: {
        ...otherInfo,
        avatar: avatar || defaultAvatar,
      },
    };
  }

  public async editUserInfo() {
    const { ctx } = this;
    const { signature = '', avatar } = ctx.request.body;
    try {
      const user = ctx.getUser();
      const userInfo = (await ctx.service.user.getUserByName(user.username)) as User;
      await ctx.service.user.editUserInfo({
        ...userInfo,
        signature,
        avatar: avatar || userInfo.avatar,
      });
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          id: userInfo.id,
          signature,
          username: userInfo.username,
        },
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: 'failure',
        data: null,
      };
    }
  }
}
