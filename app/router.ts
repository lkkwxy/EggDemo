import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret); // 传入加密字符串
  router.get('/', controller.home.index);
  router.get('/user/:id', controller.home.user);
  router.post('/add', controller.home.add);
  router.post('/api/user/regsiter', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/getUserInfo', _jwt, controller.user.getUserInfo);
  router.post('/api/user/editUserInfo', _jwt, controller.user.editUserInfo);
  router.post('/api/upload', controller.upload.upload);
};
