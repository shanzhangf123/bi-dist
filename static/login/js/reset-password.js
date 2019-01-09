$(document).ready(function () {
    var resetPasswordModule = {
        _init: function () {
            this.btn = $(".psd-login-btn");
            this.passwordInput = $(".r-person-register-info[name='password']");
            this.confirmPasswordInput = $(".r-person-register-info[name='confirmPassword']");
        },
        bind: function () {
            var _this = this;
            this.btn.click(function () {
                var btnDom = $(this);
                if (_this.passwordInput.val() == '') {
                    _this.passwordInput.showError($.i18n.prop('password_null'));
                    return;
                } 
                else if (_this.passwordInput.val().length < 8 || _this.passwordInput.val().length > 20){
                    _this.passwordInput.showError($.i18n.prop('password_length'));
                    return;
                }
                else { _this.passwordInput.hideError() }

                if (_this.passwordInput.val() != _this.confirmPasswordInput.val()) {
                    _this.confirmPasswordInput.showError($.i18n.prop('twice_password_error'));
                    return;
                } else { _this.confirmPasswordInput.hideError() }

                var token = window.location.search.split("=")[1];
                AjaxControl.post('user/reset-pwd-by-token',
                    {
                        data: JSON.stringify({
                            password: _this.passwordInput.val(),
                            confirm_password: _this.confirmPasswordInput.val(),
                            token: token,
                        })
                    },
                    function (result) {
                        if (result.status == 0) {
                            alert(result.data.errorMsg);
                        }
                        else {
                            window.location.href = '../../../index.html'
                        }
                    }, forbidBtn(btnDom), enableBtn(btnDom));
            });
        },
        init: function () {
            this._init();
            this.bind();
        }
    }
    resetPasswordModule.init();
})