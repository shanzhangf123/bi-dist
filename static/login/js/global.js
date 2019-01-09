// document.getElementById().ontouchmove = function (e) {
//     e.preventDefault && e.preventDefault();
//     e.returnValue = false;
//     e.stopPropagation && e.stopPropagation();
//     return false;
// }
document.body.style.height = '100%';
document.body.style.overflow = 'hidden';

$ ('.show-menu').click (function () {
  $ ('.phone-menu').css ('height', '100vh');
  $ ('.login-menu .font-remove').removeClass ('hide');
  $ ('.icon1-munu').addClass ('hide');
});

$ ('.close-menu').click (function () {
  $ ('.phone-menu').css ('height', '0');
  $ ('.login-menu .font-remove').addClass ('hide');
  $ ('.icon1-munu').removeClass ('hide');
});

var movePlaceholderBox = {
  _init: function () {
    this.mainBox = $ ('.move-placeholder-input-box');
    this.input = this.mainBox.find ('.move-input');
    this.p = this.mainBox.find ('.move-title');
  },

  bind: function () {
    this.input.focus (function () {
      $ (this).siblings ('p').addClass ('move-p-little');
    });
    this.input.blur (function () {
      if ($ (this).val () == '') {
        $ (this).siblings ('p').removeClass ('move-p-little');
      }
    });
  },

  init: function () {
    this._init ();
    this.bind ();
  },
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
  cnzzSrc: '',
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
  cnzzSrc: '1267453118',
};

prodConfig = {
  hmr: true,
  production: true,
  homepageUrl: 'home',
  apiPrefix: 'api',
  domain: 'https://www.blockbi.com/',
  staticResourceDomain: 'https://static.blockbi.com/',
  resourceDomain: 'https://api.blockbi.com/',
  resourceFolderDomain: 'https://api.blockbi.com/',
  resourceContactUsDomain: 'https://admin.blockbi.com/',
  socketDomain: 'wss://api.blockbi.com/chat',
  requestByDomain: true,
  apiDomain: 'https://api.blockbi.com',
  debug: false,
  socketReconnectInterval: 1000,
  socketReconnectMaxNum: 5,
  socketKeepOnlineInterval: 25000,
};

// var config = devConfig;
// var config = uatConfig;
var config = prodConfig;

function forbidBtn (btnDom) {
  btnDom.parent ().append ('<div class="forbid"></div>');
}
function enableBtn (btnDom) {
  btnDom.siblings ('.forbid').remove ();
}
AjaxControl = {
  isDuringAjax: false,
  // env: 'devConfig',
  // env: 'uatConfig',

  post: function (apiUrl, data, callback, beforeSend, complete) {
    if (this.isDuringAjax) return;

    var _this = this;
    // console.log(url, data, callback);
    // var url = devConfig.resourceDomain + 'api/' + apiUrl;
    // var url = uatConfig.resourceDomain + 'api/' + apiUrl;
    // var url = prodConfig.resourceDomain + 'api/' + apiUrl;
    var url = config.resourceDomain + 'api/' + apiUrl;
    // console.log(url)
    var param = {
      type: 'POST',
      url: url,
      data: data,
      success: function (response) {
        if (!response.hasOwnProperty ('status')) {
          // console.log(response.message);
          return;
        }

        if (typeof callback == 'function') {
          callback (response);
        }
      },
    };

    param.beforeSend = function () {
      _this.isDuringAjax = true;
      if (typeof beforeSend == 'function') beforeSend ();
    };

    param.complete = function () {
      if (typeof complete == 'function') complete ();
      _this.isDuringAjax = false;
    };

    $.ajax (param);
  },
};
movePlaceholderBox.init ();

var sessionName = 'ANGULAR_PERSISTENCE_STORAGE';
function setSessionStorage (key, value) {
  var newDate = new Date ().getTime ();
  var data = {
    created: newDate,
    data: value,
    lastAccessed: newDate,
    oneUse: false,
  };
  sessionStorage.setItem (sessionName + key, JSON.stringify (data));
}

function removeSessionStorage (key) {
  sessionStorage.removeItem (sessionName + key);
}

function getSessionStorage (key) {
  return sessionStorage.getItem (sessionName + key);
}

$.fn.extend ({
  showError: function (errorMsg) {
    var _this = this;
    var thisDom = $ (this);
    thisDom.siblings ('.error-msg').remove ();
    thisDom
      .parent ()
      .append ('<span class="error-msg">' + errorMsg + '</span>');
  },
  hideError: function () {
    var _this = this;
    var thisDom = $ (this);
    thisDom.siblings ('.error-msg').remove ();
  },
});
