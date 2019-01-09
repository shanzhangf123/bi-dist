$ (document).ready (function () {
  /**
     * 获取当前url
     */
  var url = location.search;
  var thirdLogin;
  var isThird;
  if (url.indexOf ('?') != -1) {
    isThird = true;
    thirdLogin = JSON.parse (
      sessionStorage.getItem ('ANGULAR_PERSISTENCE_STORAGE::third_register')
    );
  }

  $ ('.back-to-main').click (function () {
    $ ('.upload-fixed').addClass ('hide');
  });
  var codeConfirmModal = {
    _init: function () {
      this.codeInput = $ ('.code-input');
    },
    bind: function () {
      var _this = this;
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
    },
    init: function () {
      this._init ();
      this.bind ();
    },
  };
  codeConfirmModal.init ();
  var screenWidth = window.screen.width;
  var jcropScreen = {boxWidth: 0, boxHeight: 0, box: 300};
  if (screenWidth < 480) {
    jcropScreen.boxWidth = 300;
    jcropScreen.box = 400;
  }
  //init jcropj
  var jcrop_api, boundx, boundy, jcrop_position;
  // Grab some information about the preview pane
  ($preview = $ (
    '#preview-pane'
  )), ($pcnt = $ ('#preview-pane .preview-container')), ($pimg = $ ('#preview-pane .preview-container img')), (xsize = $pcnt.width ()), (ysize = $pcnt.height ());

  $ ('#big-pic').Jcrop (
    {
      onChange: updatePreview,
      //onSelect: updatePreview,
      bgOpacity: 1,
      aspectRatio: 1,
      borderOpacity: 0.7,
      boxWidth: jcropScreen.boxWidth,
      boxHeight: jcropScreen.boxHeight,
    },
    function () {
      // Use the API to get the real image size
      var bounds = this.getBounds ();
      boundx = bounds[0];
      boundy = bounds[1];
      // Store the API in the jcrop_api variable
      jcrop_api = this;
      jcrop_api.setOptions ({allowSelect: !!this.checked});
    }
  );
  function updatePreview (c) {
    jcrop_position = c;
  }

  var imgModule = {
    _init: function () {
      this.fileInput = $ ('#fileInput');
      this.btnSave = $ ('.but-save');
      this.imgCutPart = $ ('.upload-fixed');
      this.reUploadBtn = $ ('#re-upload-btn');
    },
    bind: function () {
      var _this = this;
      this.fileInput.change (function () {
        var file = $ (this).get (0).files[0], reader = new FileReader ();
        reader.readAsDataURL (file);
        reader.onload = function (e) {
          $ ('#big-pic').get (0).src = e.target.result;
          jcrop_api.setImage (e.target.result);
          jcrop_api.setSelect ([0, 0, jcropScreen.box, jcropScreen.box]);
          _this.imgCutPart.removeClass ('hide');
          _this.fileInput.val ('');
        };
      });
      this.reUploadBtn.click (function () {
        _this.fileInput.click ();
      });
      this.btnSave.click (function () {
        var canvas = document.getElementById ('canvas');
        var ctx = canvas.getContext ('2d');
        var img = document.getElementById ('big-pic');
        ctx.drawImage (
          img,
          jcrop_position.x,
          jcrop_position.y,
          jcrop_position.w,
          jcrop_position.h,
          0,
          0,
          300,
          300
        );
        dataURL = canvas.toDataURL ('image/jpeg');
        $ ('#short-pic').get (0).src = dataURL;
        _this.imgCutPart.addClass ('hide');
      });
    },
    init: function () {
      this._init ();
      this.bind ();
    },
  };

  imgModule.init ();
  var createModule = {
    _init: function () {
      this.createBtn = $ ('.r-register-create-button');
      this.inputBox = $ ('.r-person-list');
      this.workName = this.inputBox.find ("input[name = 'work_name']");
      this.password = this.inputBox.find ("input[name = 'password']");
      this.phone = this.inputBox.find ("input[name = 'phone']");
      this.confirmPassword = this.inputBox.find (
        "input[name = 'confirm_password']"
      );
      this.email = this.inputBox.find ("input[name = 'email']");
      this.code = $ ('.code-input');
      this.sendCodeBtn = $ ('.but-send-code');
      this.enableSendCode = true;
      this.phoneReg = /^1\d{10}$/;
      this.emailReg = /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$/;
      this.eInput = $ ('#p-email');
      this.phoneInput = $ ('#p-phone');
      this.passwordInput = $ ('#p-password');
      this.workNameInput = $ ('#p-workname');
      this.termService = $ ('#term-service');
    },

    bind: function () {
      var _this = this;
      var formatLang = sessionStorage.getItem (
        'ANGULAR_PERSISTENCE_STORAGE::lan'
      )
        ? JSON.parse (
            sessionStorage.getItem ('ANGULAR_PERSISTENCE_STORAGE::lan')
          ).data
        : 'en';
      this.termService.click (function () {
        if (formatLang == 'zh-cn') {
          window.open ('https://static.blockbi.com/pp-cn.html');
        } else {
          window.open ('https://static.blockbi.com/pp-en.html');
        }
      });
      this.createBtn.click (function () {
        var btnDom = $ (this);
        var formData = {};
        if (_this.validateForm ()) {
          formData.module = isThird ? thirdLogin.data.module : 0;
          formData.pid = isThird ? thirdLogin.data.id : '';
          formData.work_name = _this.workName.val ();
          formData.email = _this.email.val ();
          formData.password = _this.password.val ();
          formData.phone = _this.phone.val ();
          formData.profile = $ ('#short-pic').get (0).src;
          var str = formData.profile.substr (0, 4);
          if (str != 'data') {
            formData.profile = '';
          }
          var codeString = '';
          _this.code.each (function () {
            codeString += $ (this).val () + '';
          });
          formData.code = codeString;
          formData.confirm_password = _this.confirmPassword.val ();
          formData.lang = formatLang == 'zh-cn' ? 'chs' : 'en';
          // return;
          AjaxControl.post (
            'user/register',
            formData,
            function (result) {
              if (result.status == 1) {
                var data = {
                  user: result.data.user,
                  companies_information: result.data.companies_information,
                  session_id: result.data.session_id,
                };
                setSessionStorage ('::session_id', data.session_id);
                setSessionStorage ('::companies', data.companies_information);
                const userData = data.user ? data.user : {};
                setSessionStorage ('::user_data', userData);
                setSessionStorage ('::first_login', true);
                window.location.href = 'dashboard';
                // }
                //清除过期的URL
                removeSessionStorage ('::expire_url');
                removeSessionStorage ('::third_register');
              } else {
                _this.phone.hideError ();
                _this.email.hideError ();
                $ ('.auth-code').hideError ();
                var errorCode = result.data.errorCode;
                if (errorCode == 1051003) {
                  _this.phone.showError ($.i18n.prop ('phone_has_used'));
                  return;
                } else if (errorCode == 1051002) {
                  _this.email.showError ($.i18n.prop ('email_has_used'));
                  return;
                } else if (errorCode == 1051016) {
                  $ ('.auth-code').showError ($.i18n.prop ('code_error'));
                  return;
                } else if (errorCode == 1051006) {
                  alert ($.i18n.prop ('register_fail'));
                } else if (errorCode == 1051001) {
                  // console.log
                  _this.workName.showError (result.data.errorMsg);
                }
              }
            },
            forbidBtn (btnDom),
            enableBtn (btnDom)
          );
        }
      });
      //
      //
      this.eInput.focus (function () {
        _this.email.hideError ();
      });
      this.phoneInput.focus (function () {
        _this.phone.hideError ();
      });
      this.passwordInput.focus (function () {
        _this.password.hideError ();
      });
      this.workNameInput.focus (function () {
        _this.workName.hideError ();
      });
      this.code.focus (function () {
        $ ('.auth-code').hideError ();
      });
      //确认密码验证
      this.confirmPassword.on ('input propertychange', function () {
        if (_this.confirmPassword.val () == _this.password.val ()) {
          _this.confirmPassword.hideError ();
        }
      });
      this.confirmPassword.blur (function () {
        if (_this.confirmPassword.val () == _this.password.val ()) {
          _this.confirmPassword.hideError ();
        } else {
          _this.confirmPassword.showError (
            $.i18n.prop ('twice_password_error')
          );
        }
      });
      this.passwordInput.on ('input propertychange', function () {
        if (_this.confirmPassword.val () == _this.password.val ()) {
          _this.confirmPassword.hideError ();
        }
      });

      this.sendCodeBtn.click (function () {
        if (_this.enableSendCode) {
          if (!_this.phoneReg.test (_this.phone.val ())) {
            _this.phone.showError ($.i18n.prop ('error_phone'));
            return;
          }
          _this.enableSendCode = false;
          _this.setTime (60);
          var data = {means: _this.phone.val ()};
          data = JSON.stringify (data);
          AjaxControl.post ('user/get-register-code', {data: data}, function (
            result
          ) {
            if (result.status == 0) {
              _this.phone.showError ($.i18n.prop ('phone_has_used'));
              _this.enableSendCode = true;
              if (formatLang == 'en') {
                $ ('.but-send-code span').text ('SEND AUTH CODE');
              } else {
                // 发送验证码
                $ ('.but-send-code span').text ('发送验证码');
              }
            } else if (result.status == 1) {
              $ ('#auth-code').removeClass ('hide');
              _this.phone.hideError (result.message);
            }
          });
          $ ('.auth-code').hideError ();
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
          if (formatLang == 'en') {
            $ ('.but-send-code span').text ('SEND AUTH CODE');
          } else {
            // 发送验证码
            $ ('.but-send-code span').text ('发送验证码');
          }
        }
      }
    },

    validateForm: function () {
      var _this = this;
      var isOk = true;
      if (_this.workName.val () == '') {
        _this.workName.showError ($.i18n.prop ('workname_null'));

        isOk = false;
      } else if (
        _this.workName.val ().length < 2 ||
        _this.workName.val ().length > 20
      ) {
        _this.workName.showError ($.i18n.prop ('workname_length'));
        isOk = false;
      } else {
        _this.workName.hideError ();
      }
      if (_this.password.val () == '') {
        _this.password.showError ($.i18n.prop ('password_null'));
        isOk = false;
      } else if (
        _this.password.val ().length < 8 ||
        _this.password.val ().length > 20
      ) {
        _this.password.showError ($.i18n.prop ('password_length'));
        isOk = false;
      } else {
        _this.password.hideError ();
      }

      if (!_this.phoneReg.test (_this.phone.val ())) {
        _this.phone.showError ($.i18n.prop ('error_phone'));
        isOk = false;
      } else {
        _this.phone.hideError ();
        _this.code.each (function () {
          if ($ (this).val () == '') {
            isOk = false;
            codeFull = false;
            if ($ ('#auth-code').hasClass ('hide')) {
              _this.phone.showError ($.i18n.prop ('code_error1'));
            }
            return;
          }
        });
      }
      if (_this.confirmPassword.val () != _this.password.val ()) {
        _this.confirmPassword.showError ($.i18n.prop ('twice_password_error'));
        isOk = false;
      } else {
        _this.confirmPassword.hideError ();
      }
      if (!_this.emailReg.test (_this.email.val ())) {
        _this.email.showError ($.i18n.prop ('error_email'));
        isOk = false;
      } else {
        _this.email.hideError ();
      }
      var codeFull = true;
      _this.code.each (function () {
        if ($ (this).val () == '') {
          isOk = false;
          codeFull = false;
          $ ('.auth-code').showError ($.i18n.prop ('code_error'));
          return;
        }
      });
      if (codeFull) {
        $ ('.auth-code').hideError ();
      }
      return isOk;
    },

    init: function () {
      this._init ();
      this.bind ();
    },
  };
  createModule.init ();
});
