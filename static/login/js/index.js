var session_companies = sessionStorage.getItem (
  'ANGULAR_PERSISTENCE_STORAGE::companies'
);
var session_session_id = sessionStorage.getItem (
  'ANGULAR_PERSISTENCE_STORAGE::session_id'
);
var session_user_data = sessionStorage.getItem (
  'ANGULAR_PERSISTENCE_STORAGE::user_data'
);
var expire_url = JSON.parse (
  sessionStorage.getItem ('ANGULAR_PERSISTENCE_STORAGE::expire_url')
);
// if (session_companies && session_session_id && session_user_data) {
//   if (expire_url && expire_url.data.url != '/' && JSON.parse(session_user_data).uuid == expire_url.data.uuid) {
//     window.location.href = expire_url.data.url;
//   } else {
//     window.location.href = 'dashboard';
//   }

// }

const UserConfig = {
  CEO: 1,
  CEO_ASS: 2,
  HR: 3,
  HR_ASS: 4,
  STAFF_MANAGER: 5,
  ATTENDANCE_MANAGE: 6,
  IT: 7,
  IT_ASS: 8,
  ADMIN: 9,
  ADMIN_ASS: 10,
  MEETING_ROOM_MAN: 11,
};

var isIphoneSafari;

var userAgent = navigator.userAgent;
if (
  userAgent.indexOf ('Safari') != -1 &&
  userAgent.indexOf ('Mobile') != -1 &&
  userAgent.indexOf ('iPhone') != -1 &&
  userAgent.indexOf ('Baidu') == -1
) {
  $ ('.body-g').addClass ('safari');
} else {
}

window.onload = function () {
  setTimeout (function () {
    document.getElementById ('video').play ();
  }, 3000);
};
var ifFirst = sessionStorage.getItem ('first_in_bi');
if (ifFirst != 1) {
  sessionStorage.setItem ('first_in_bi', '1');
}

var showContact = false;
function addBlurBd () {
  $ ('.pc-bd').addClass ('blur');
}
function removeBlurBd () {
  $ ('.pc-bd').removeClass ('blur');
}

function getUserRole (company_info) {
  var role = {
    isCeo: false,
    isCeoAss: false,
    isHr: false,
    isHrAss: false,
    isStaffMa: false,
    isAttendanceMa: false,
    isIT: false,
    isITAss: false,
    isADMIN: false,
    isADMINASS: false,
    isMeetingRoom: false,
  };
  if (company_info[0]) {
    company_info[0].role.forEach (item => {
      switch (item) {
        case UserConfig.CEO:
          role.isCeo = true;
          break;
        case UserConfig.CEO_ASS:
          role.isCeoAss = true;
          break;
        case UserConfig.HR:
          role.isHr = true;
          break;
        case UserConfig.HR_ASS:
          role.isHrAss = true;
          break;
        case UserConfig.STAFF_MANAGER:
          role.isStaffMa = true;
          break;
        case UserConfig.ATTENDANCE_MANAGE:
          role.isAttendanceMa = true;
          break;
        case UserConfig.IT:
          role.isIT = true;
          break;
        case UserConfig.IT_ASS:
          role.isITAss = true;
          break;
        case UserConfig.ADMIN:
          role.isADMIN = true;
          break;
        case UserConfig.ADMIN_ASS:
          role.isADMINASS = true;
          break;
        // MEETING_ROOM_MAN
        case UserConfig.MEETING_ROOM_MAN:
          role.isMeetingRoom = true;
          break;
        default:
          break;
      }
    });
  }
  setSessionStorage ('::user_role', role);
}

$ (document).ready (function () {
  $ ('#contact-btn').contactUs (openContact, closeContact);
  function closeContact () {
    window.location.hash = '';
    $ ('.page').css ('display', 'block');
    showContact = false;
    $ ('.login-part').removeClass ('hide');
    $ ('#fg-part').addClass ('hide');
    $ ('#sign-in-group').removeClass ('login-show-animated');
    $ ('.login-footer').removeClass ('white-bd-footer, phone-invisible');
    pageScrollModal.moveToPage ();
  }
  function openContact () {
    window.location.hash = 'contactus';
    $ ('.page').css ('display', 'none');
    addBlurBd ();
    $ ('.login-part').addClass ('hide');
    $ ('#fg-part').addClass ('hide');
    $ ('.login-footer').addClass ('white-bd-footer, phone-invisible');
  }

  //判断hash 默认打开 联系人页面
  if (
    window.location.hash &&
    window.location.hash.indexOf ('contactus') != -1
  ) {
    $ ('.page').css ('display', 'none');
    addBlurBd ();
    $ ('.login-part').addClass ('hide');
    $ ('#fg-part').addClass ('hide');
    $ ('.login-footer').addClass ('white-bd-footer, phone-invisible');
    $ ('#contact-us-box').removeClass ('contact-hide');
  } else {
    $ ('.page').css ('display', 'block');
    showContact = false;
    $ ('.login-part').removeClass ('hide');
    $ ('#fg-part').addClass ('hide');
    $ ('#sign-in-group').removeClass ('login-show-animated');
    $ ('.login-footer').removeClass ('white-bd-footer, phone-invisible');
    $ ('#contact-us-box').addClass ('contact-hide');
  }

  var signModule = {
    _init: function () {
      this.loginBtn = $ ('#login-btn');
      this.loginInForm = $ ('#login-in-form');
      this.username = this.loginInForm.find ("input[name='username']");
      this.password = this.loginInForm.find ("input[name='password']");
      this.usernameError = this.username.siblings ('.alert-error');
      this.passwordError = this.password.siblings ('.alert-error');
      this.page1 = $ ('.page-1');
      this.signInGroup = $ ('#sign-in-group');
      this.needReset = true;
      this.smallPart = $ ('.sign-in-small');
      this.bigPart = $ ('.sign-in-big');
    },

    bind: function () {
      this.bigPart.click (function (event) {
        event.stopPropagation ();
      });
      var _this = this;
      this.smallPart.click (function () {
        $ ('#username').val ('');
        $ ('#password').val ('');
      });
      this.signInGroup.click (function () {
        _this.smallPart.addClass ('hide');
        setTimeout (function () {
          $ ('#sign-in-group').addClass ('login-show-animated');
          _this.username.hideError ();
          _this.password.hideError ();
          setTimeout (function () {
            $ ('.pc-bd').addClass ('blur');
            _this.bigPart.removeClass ('hide');
          }, 400);
        }, 100);
      });
      this.signInGroup.mouseout (function () {
        _this.needReset = true;
      });
      this.signInGroup.mouseover (function () {
        _this.needReset = false;
      });
      this.page1.click (function () {
        if (_this.needReset) {
          forgetPasswordModule.loginPart.removeClass ('hide');
          forgetPasswordModule.fgPart.addClass ('hide');
          setTimeout (function () {
            $ ('#sign-in-group').removeClass ('login-show-animated');
            $ ('#toggle-lan-box').addClass ('hide');
            setTimeout (function () {
              $ ('.pc-bd').removeClass ('blur');
              _this.smallPart.removeClass ('hide');
            }, 400);
          }, 100);
        }
      });
      $ ('#sign-in-big').bind ('keydown', function (e) {
        var theEvent = e || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {
          //回车执行查询
          _this.loginBtn.click ();
        }
      });
      this.loginBtn.click (function (event) {
        event.stopPropagation ();
        var enableSubmit = true;
        var thisBtn = $ (this);
        if (_this.username.val () == '') {
          _this.username.showError ($.i18n.prop ('name_null'));
          enableSubmit = false;
        } else {
          _this.usernameError.removeClass ('show-alert-error');
        }
        if (_this.password.val () == '') {
          _this.password.showError ($.i18n.prop ('password_null'));
          enableSubmit = false;
        } else {
          _this.passwordError.removeClass ('show-alert-error');
        }
        if (enableSubmit) {
          $ ('.progress-line').addClass ('progress-loading');
          $ ('#login-btn').addClass ('background-white');

          AjaxControl.post (
            'user/login-check',
            {username: _this.username.val (), password: _this.password.val ()},
            function (result) {
              $ ('.progress-line').addClass ('progress-finish');

              if (result.status == '1') {
                setTimeout (function () {
                  var data = {
                    user: result.data.user,
                    companies_information: result.data.companies_information,
                    session_id: result.data.session_id,
                  };
                  setSessionStorage ('::session_id', data.session_id);
                  setSessionStorage ('::companies', data.companies_information);
                  const userData = data.user ? data.user : {};
                  setSessionStorage ('::user_data', userData);
                  getUserRole (result.data.companies_information);
                  if (
                    expire_url &&
                    expire_url.data.url != '/' &&
                    userData.uuid == expire_url.data.uuid
                  ) {
                    window.location.href = expire_url.data.url;
                  } else if (
                    expire_url &&
                    expire_url.data.url != '/' &&
                    expire_url.data.isRedirect
                  ) {
                    window.location.href = expire_url.data.url;
                  } else {
                    window.location.href = 'dashboard';
                  }
                  //清除过期的URL
                  removeSessionStorage ('::expire_url');
                }, 800);
              } else {
                setTimeout (function () {
                  $ ('.progress-line').addClass ('background-red');
                  var errorCode = result.data.errorCode;
                  _this.username.hideError ();
                  _this.password.hideError ();
                  if (errorCode == 1991007) {
                    _this.username.showError ($.i18n.prop ('name_not_found'));
                  } else if (errorCode == 1051005) {
                    _this.password.showError ($.i18n.prop ('error_password'));
                  }
                  setTimeout (function () {
                    $ ('#login-btn').removeClass ('background-white');
                    $ ('.progress-line').addClass ('hide');
                    $ ('.progress-line').removeClass ('progress-loading');
                    $ ('.progress-line').removeClass ('progress-finish');
                    $ ('.progress-line').removeClass ('background-red');
                    setTimeout (function () {
                      $ ('.progress-line').removeClass ('hide');
                    }, 800);
                  }, 800);
                }, 800);
              }
            },
            forbidBtn (thisBtn),
            enableBtn (thisBtn)
          );
        }
      });
      this.username.focus (function () {
        _this.username.hideError ();
      });
      this.password.focus (function () {
        _this.password.hideError ();
      });
      this.username.on ('input propertychange', function () {
        _this.username.hideError ();
      });
      this.password.on ('input propertychange', function () {
        _this.password.hideError ();
      });
      this.username.change (function () {
        _this.username.hideError ();
      });
      this.password.change (function () {
        _this.password.hideError ();
      });
    },
    phoneMenu: {
      open: function () {
        if (isIphoneSafari) {
          $ ('.phone-menu').css ('height', '70vh');
        } else {
          $ ('.phone-menu').css ('height', '100vh');
        }
        $ ('.login-menu .font-remove').removeClass ('hide');
        $ ('.icon1-munu').addClass ('hide');
      },

      close: function () {
        $ ('.phone-menu').css ('height', '0');
        $ ('.login-menu .font-remove').addClass ('hide');
        $ ('.icon1-munu').removeClass ('hide');
      },
    },

    init: function () {
      this._init ();
      this.bind ();
    },
  };
  signModule.init ();

  var forgetPasswordModule = {
    _init: function () {
      this.fgBtn = $ ('#fg-btn');
      this.fgPart = $ ('#fg-part');
      this.loginPart = $ ('.login-part');
      this.codeInput = $ ('.code-input');
      this.resetPasswordBtn = $ ('#reset-password');
      this.sendEmailBtn = $ ('#send-email-btn');
      this.sendPhoneBtn = $ ('#send-phone-btn');
      this.email = this.fgPart.find ("input[name='email']");
      this.phone = this.fgPart.find ("input[name='phone']");
      this.allCode = $ ('.auth-code');
      this.phoneAuthCode = $ ('#phone-auth-code');
      this.phoneReg = /^1\d{10}$/;
      this.emailReg = /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$/;
      this.enableSendCode = true;
    },

    bind: function () {
      var _this = this;

      this.fgPart.mouseout (function () {
        signModule.needReset = true;
      });
      this.fgPart.mouseover (function () {
        signModule.needReset = false;
      });
      this.fgBtn.click (function () {
        _this.loginPart.addClass ('hide');
        _this.fgPart.removeClass ('hide');
      });
      this.codeInput.bind ({
        focus: function () {
          $ (this).addClass ('current');
        },
        blur: function () {
          $ (this).removeClass ('current');
        },
        keyup: function () {
          if ($ (this).val () != '') {
            $ (this).next ().focus ();
          } else {
            $ (this).prev ().focus ();
          }
        },
      });
      this.resetPasswordBtn.click (function () {
        var emailAddress = _this.email.val ();
        var phoneNum = _this.phone.val ();
        var btnDom = $ (this);
        if (
          !_this.emailReg.test (emailAddress) &&
          !_this.phoneReg.test (phoneNum)
        ) {
          _this.phone.showError ($.i18n.prop ('error_phone'));
          _this.email.showError ($.i18n.prop ('error_email'));
          return;
        }
        _this.phone.hideError ();
        _this.email.hideError ();
        var codeIsOk = true;
        var codeString = _this.phoneAuthCode.val ();
        if (codeString == '') {
          _this.phoneAuthCode.showError ($.i18n.prop ('code_error'));
          _this.codeInput.each (function () {
            var thisDom = $ (this);
            if (thisDom.val () == '') {
              _this.allCode.showError ($.i18n.prop ('code_error'));
            }
            codeString += thisDom.val () + '';
          });
        }
        if (codeString == '') {
          codeIsOk = false;
          return;
        }
        if (codeIsOk) {
          _this.allCode.hideError ();
          AjaxControl.post (
            'user/check-rp-token',
            {data: JSON.stringify ({token: codeString})},
            function (result) {
              if (result.status == '0') {
                _this.allCode.showError ($.i18n.prop ('code_error'));
              } else {
                window.location.href =
                  './static/login/html/reset-password.html?token=' + codeString;
              }
            },
            forbidBtn (btnDom),
            enableBtn (btnDom)
          );
        }
      });
      this.sendEmailBtn.click (function () {
        var emailAddress = _this.email.val ();
        if (_this.emailReg.test (emailAddress)) {
          _this.email.hideError ();
          AjaxControl.post (
            'user/apply-reset-pwd',
            {
              data: JSON.stringify ({
                means: emailAddress,
                lang: formatLang.data == 'zh-cn' ? 'chs' : formatLang.data,
              }),
            },
            function (result) {
              if (result.status == '0') {
                _this.email.showError ($.i18n.prop ('email_no_used'));
              }
            }
          );
        } else {
          _this.email.showError ($.i18n.prop ('error_email'));
        }
      });
      this.sendPhoneBtn.click (function () {
        if (_this.enableSendCode) {
          var phoneNum = _this.phone.val ();
          if (_this.phoneReg.test (phoneNum)) {
            _this.phone.hideError ();
            _this.enableSendCode = false;
            _this.setTime (60);
            AjaxControl.post (
              'user/apply-reset-pwd',
              {
                data: JSON.stringify ({
                  means: phoneNum,
                  lang: formatLang.data == 'zh-cn' ? 'chs' : formatLang.data,
                }),
              },
              function (result) {
                if (result.status == '0') {
                  _this.enableSendCode = true;
                  $ ('.but-send-code span').text ('SEND AUTH CODE');
                  _this.phone.showError ($.i18n.prop ('phone_no_used'));
                } else {
                  _this.phone.hideError ();
                }
              }
            );
          } else {
            _this.phone.showError ($.i18n.prop ('error_phone'));
          }
        }
      });
    },

    setTime: function (time) {
      if (!this.enableSendCode) {
        var _this = this;
        var spanDom = $ ('.but-send-code span');
        if (time > 0) {
          spanDom.text (time + 's');
          setTimeout (function () {
            time--;
            _this.setTime (time);
          }, 1000);
        } else {
          _this.enableSendCode = true;
          spanDom.text ('SEND AUTH CODE');
        }
      }
    },
    init: function () {
      this._init ();
      this.bind ();
    },
  };
  forgetPasswordModule.init ();

  var pageScrollModal = {
    _init: function () {
      this.body = $ ('body');
      this.allPages = $ ('.all-pages');
      this.menuItem = $ ('.login-header-lst li');
      this.pageI = 0;
      this.headerList = $ ('.login-header-lst');
      this.iconLogo = $ ('.icon-logo');
      this.phoneMenuItem = $ ('.menu-content');
      this.signUpBtn = $ ('#sign-up');
      this.aboutUsDownBtn = $ ('.about-us-down-icon');
      this.aboutUsUpBtn = $ ('.about-us-up-icon');
      this.enableMovePage = true;
    },

    bind: function () {
      var _this = this;
      this.signUpBtn.click (function () {
        window.location.href = 'static/login/register.html';
      });
      this.aboutUsDownBtn.click (function () {
        _this.pageI = 2;
        _this.moveToPage ();
      });
      this.aboutUsUpBtn.click (function () {
        _this.pageI = 1;
        _this.moveToPage ();
      });
      this.iconLogo.click (function () {
        _this.pageI = 0;
        _this.moveToPage ();
      });
      this.body.on ('mousewheel DOMMouseScroll', function (e) {
        var delta =
          (e.originalEvent.wheelDelta &&
            (e.originalEvent.wheelDelta > 2
              ? 1
              : e.originalEvent.wheelDelta < -2 ? -1 : 0)) ||
          (e.originalEvent.detail &&
            (e.originalEvent.wheelDelta > 2
              ? 1
              : e.originalEvent.wheelDelta < -2 ? -1 : 0)); // firefox
        if (_this.enableMovePage) {
          _this.enableMovePage = false;
          setTimeout (function () {
            _this.enableMovePage = true;
          }, 1000);
          if (delta > 0) {
            _this.pageI--;
          } else if (delta < 0) {
            _this.pageI++;
          }
          _this.pageI = _this.pageI > 0
            ? _this.pageI < 6 ? _this.pageI : 6
            : 0;
          _this.moveToPage ();
        }
      });

      this.phoneMenuItem.click (function () {
        var index = $ (this).data ('index');
        _this.pageI = index;
        _this.moveToPage ();
        signModule.phoneMenu.close ();
      });

      this.headerList.find ('li').click (function () {
        if ($ (this).hasClass ('menu-item-1')) {
          _this.pageI = 1;
        }
        if ($ (this).hasClass ('menu-item-2')) {
          _this.pageI = 3;
        }
        if ($ (this).hasClass ('menu-item-3')) {
          _this.pageI = 4;
        }
        if ($ (this).hasClass ('menu-item-4')) {
          _this.pageI = 6;
        }
        _this.moveToPage ();
      });
    },

    moveToPage: function () {
      if (this.pageI == 4) {
        $ ('.price-menu-box').addClass ('show-price-menu');
        $ ('#page4-btn').addClass ('full-circle');
        $ ('#page5-btn').removeClass ('full-circle');
        $ ('.page5-span').removeClass ('show-price-menu');
      } else if (this.pageI == 5) {
        $ ('.price-menu-box').addClass ('show-price-menu');
        $ ('#page4-btn').removeClass ('full-circle');
        $ ('#page5-btn').addClass ('full-circle');
        $ ('.page5-span').addClass ('show-price-menu');
      } else {
        $ ('.price-menu-box').removeClass ('show-price-menu');
      }
      if (this.pageI < 1) {
        removeBlurBd ();
      } else {
        addBlurBd ();
      }
      this.menuItem.removeClass ('current');
      var page = 0;
      if (this.pageI == 1 || this.pageI == 2) {
        page = 1;
      } else if (this.pageI == 3) {
        page = 2;
      } else if (this.pageI == 4 || this.pageI == 5) {
        page = 3;
      } else if (this.pageI == 6) {
        page = 4;
      }
      $ ('.menu-item-' + page).addClass ('current');
      this.allPages.css (
        'top',
        'calc(' + this.pageI * 132 + 'px - ' + this.pageI * 100 + 'vh)'
      );
      $ ('.sidebar-show').removeClass ('sidebar-show');
    },

    init: function () {
      this._init ();
      this.bind ();
    },
  };
  pageScrollModal.init ();

  var priceModule = {
    _init: function () {
      this.goPrice1Btn = $ ('.go-price1');
      this.goPrice2Btn = $ ('.go-price2');
      this.goPrice3Btn = $ ('.go-price3');
      this.goPrice4Btn = $ ('.go-price4');
    },

    bind: function () {
      var _this = this;
      this.goPrice4Btn.click (function () {
        pageScrollModal.pageI = 4;
        pageScrollModal.moveToPage ();
      });
      this.goPrice3Btn.click (function () {
        pageScrollModal.pageI = 5;
        pageScrollModal.moveToPage ();
      });
      this.goPrice1Btn.click (function () {
        pageScrollModal.pageI = 4;
        pageScrollModal.moveToPage ();
      });
      this.goPrice2Btn.click (function () {
        pageScrollModal.pageI = 5;
        pageScrollModal.moveToPage ();
      });
    },

    init: function () {
      this._init ();
      this.bind ();
    },
  };
  priceModule.init ();
});

/**
* 第三方登录
*/
/**
  * 保存点击的第三方账户 到session storage
  * @param {MouseEvent} event
  * @param {number} type
  */
function clickRecordThirdAccount (type) {
  AjaxControl.post (
    'partner/get-authorized-address',
    {data: JSON.stringify ({module: type})},
    function (result) {
      if (result.status == 1) {
        setSessionStorage ('::third_type', type);
        if (result.data.hasOwnProperty ('url')) {
          location.href = result.data.url;
        }
      } else {
      }
    }
  );
}
