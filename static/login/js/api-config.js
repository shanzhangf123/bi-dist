var BI_API = {
  //上传
  upload: 'file-save',

  //用户操作
  login: 'user/login-check',	//用户登录
  logout: 'user/logout',		//用户退出
  register: 'user/register',	//个人注册
  switchCompany: 'user/switch-company',		//首页公司切换
  contact: 'user/contact-us', //contact-us
  resetPsd: 'user/reset-pwd-by-token', //reset-psd
  resetPassword: 'user/reset-pwd',//account 中修改密码
  recoverPsd: 'user/find-password', //recover-psd
  sendEmailOrPhone: 'user/apply-reset-pwd', //发送邮箱 或手机号
  checkToken: 'user/check-rp-token', //发送邮箱 或手机号

  resetPermission: 'user/reset-permission',	//更改用户状态,重新设置权限,此接口暂时兼容,后期改掉
};

localConfig = {
  APP_VERSION: '0.4.3',
  domain: 'http://localhost/',
  staticResourceDomain: 'http://localhost:3000/',
  apiPrefix: 'api',
  resourceDomain: 'http://devapi.blockbi.com/',
  resourceFolderDomain: 'http://devapi.blockbi.com/',
  resourceContactUsDomain: 'http://devadmin.blockbi.com/',
  socketDomain: 'ws://dev-bi-im.blockbi.com:9988/',
  requestByDomain: false,
  apiDomain: 'http://devapi.blockbi.com',
  debug: true,
  cnzzSrc: ''
};

devConfig = {
  APP_VERSION: '0.4.3',
  domain: 'http://devfront.blockbi.com/',
  staticResourceDomain: 'http://devfront.blockbi.com/',
  apiPrefix: 'api',
  resourceDomain: 'http://devapiv2.blockbi.com/',
  resourceFolderDomain: 'http://devapiv2.blockbi.com/',
  resourceContactUsDomain: 'http://devadmin.blockbi.com/',
  socketDomain: 'ws://dev-bi-im.blockbi.com:9988/',
  requestByDomain: true,
  apiDomain: 'http://devapiv2.blockbi.com',
  debug: true,
  cnzzSrc: ''
};

uatConfig = {
  APP_VERSION: '0.4.3',
  domain: 'https://uatwww.blockbi.com/',
  staticResourceDomain: 'https://uatwww.blockbi.com/',
  apiPrefix: 'api',
  resourceDomain: 'https://uatapi.blockbi.com/',
  resourceFolderDomain: 'https://uatapi.blockbi.com/',
  resourceContactUsDomain: 'http://uatadmin.blockbi.com/',
  socketDomain: 'wss://uatapi.blockbi.com/chat',
  requestByDomain: true,
  apiDomain: 'https://uatapi.blockbi.com',
  debug: false,
  cnzzSrc: '1267453118'
};

prodConfig = {
  APP_VERSION: '1.0.0',
  domain: 'https://www.blockbi.com/',
  staticResourceDomain: 'https://static.blockbi.com/',
  apiPrefix: 'api',
  resourceDomain: 'https://api.blockbi.com/',
  resourceFolderDomain: 'https://api.blockbi.com/',
  socketDomain: 'wss://api.blockbi.com/chat',
  requestByDomain: true,
  apiDomain: 'https://api.blockbi.com',
  debug: false,
  cnzzSrc: '1267288208'
};