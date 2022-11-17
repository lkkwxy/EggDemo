import { Context } from 'egg';
export default function (secret) {
  return async (ctx: Context, next: () => Promise<void>) => {
    const token = ctx.request.header.token;
    if (token != 'null' && token && typeof token == 'string') {
      try {
        const result = ctx.app.jwt.verify(token, secret) as unknown as { id: number; username: string };
        ctx.setUser(result);
        await next();
      } catch (error) {
        ctx.status = 200;
        ctx.body = {
          code: 401,
          msg: '无效的token',
        };
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        msg: 'token不存在',
      };
    }
  };
}
