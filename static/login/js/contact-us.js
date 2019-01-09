$.fn.extend ({
  contactUs: function (openContact, closeFunction) {
    var formatLang = sessionStorage.getItem ('ANGULAR_PERSISTENCE_STORAGE::lan')
      ? JSON.parse (sessionStorage.getItem ('ANGULAR_PERSISTENCE_STORAGE::lan'))
          .data
      : 'en';
    $.post (
      config.resourceContactUsDomain + 'api/about-us',
      {
        lang: formatLang == 'zh-cn' ? 'chs' : 'en',
      },
      function (result) {
        // if (result.status == 1) {
          // console.log (7812212, result);
          $ ('#phone_msg').html (result.data.mobile);
          $ ('#email_msg').html (result.data.email);
          $ ('#address_msg').html (result.data.address);
        // }
      }
    );
    var _this = this;
    var thisDom = $ (this);
    this.contactBoX = $ ('#contact-us-box');
    this.closeBtn = $ ('.contact-main');
    this.sendContactUs = $ ('#send-contact-us');
    this.contactName = this.contactBoX.find ("input[name = 'name']");
    this.contactEmail = this.contactBoX.find ("input[name = 'email']");
    this.contactMessage = this.contactBoX.find ("textarea[name = 'msg']");
    this.reg = /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$/;
    thisDom.click (function () {
      event.stopPropagation ();
      if (_this.contactBoX.hasClass ('contact-hide')) {
        _this.contactBoX.removeClass ('contact-hide');
        openContact ();
      } else {
        _this.contactBoX.addClass ('contact-hide');
        closeFunction ();
      }
    });
    this.closeBtn.click (function () {
      _this.contactBoX.addClass ('contact-hide');
      event.stopPropagation ();
      closeFunction ();
    });
    this.sendContactUs.click (function () {
      if (_this.checkForm ()) {
        var contactData = {};
        contactData.name = _this.contactName.val ();
        contactData.email = _this.contactEmail.val ();
        contactData.message = _this.contactMessage.val ();
        $.post (
          config.resourceContactUsDomain + 'api/contact-us',
          contactData,
          function (result) {
            _this.contactBoX.addClass ('contact-hide');
            event.stopPropagation ();
            closeFunction ();
          }
        );
      }
    });
    this.checkForm = function () {
      var isOk = true;
      if (_this.contactName.val () == '') {
        _this.contactName.showError ('name is required');
        isOk = false;
      } else {
        _this.contactName.hideError ();
      }
      if (!_this.reg.test (_this.contactEmail.val ())) {
        _this.contactEmail.showError ('email is required');
        isOk = false;
      } else {
        _this.contactEmail.hideError ();
      }
      if (_this.contactMessage.val () == '') {
        _this.contactMessage.showError ('Message is required');
        isOk = false;
      } else {
        _this.contactMessage.hideError ();
      }
      return isOk;
    };
  },
});
