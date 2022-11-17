import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1668651594278_8705';
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['*'],
  };
  config.view = {
    mapping: { '.html': 'ejs' }, //左边写成.html后缀，会自动渲染.html文件
  };

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.mysql = {
    client: {
      host: '43.143.207.236',
      port: '3306',
      user: 'root',
      password: 'KCRqCy_k;9ch.',
      database: 'Bill',
    },
    app: true,
    agent: false,
  };

  config.jwt = {
    secret: 'wxylkk',
  };

  config.userConfig = {
    uploadDir: 'app/public/upload',
  };
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
