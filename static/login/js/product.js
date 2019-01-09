$(document).ready(function () {

    var mapModule = {
        _init: function () {
            this.mapDom = $("#img-bd");
            this.pcBd = $(".product-bd");
            this.leftArrow = $('#left-arrow');
            this.rightArrow = $('#right-arrow');
            this.topArrow = $('#top-arrow');
            this.bottomArrow = $('#bottom-arrow');
        },
        bind: function () {
            var _this = this;
            var canMove = false;
            var oldEvent = null;
            var maxLeft = $(window).width() - 2190;
            var maxHeight = $(window).height() - 1225 - 65;

            this.mapDom.on('mousedown', (function () {
                canMove = true;
            }));
            this.mapDom.on('mouseup', (function () {
                canMove = false; oldEvent = null;
            }));
            this.mapDom.click(function () {
                canMove = false; oldEvent = null;
            });
            this.mapDom.on('mousemove', (function (event) {

                if (canMove) {
                    if (oldEvent != null) {
                        var dw = event.clientX - oldEvent.clientX;
                        var dh = event.clientY - oldEvent.clientY;
                        var top = _this.pcBd.css("top") + '';
                        var left = _this.pcBd.css("left") + '';
                        var moveTop = Number(top.substring(0, top.length - 2)) + Number(dh);
                        var moveLeft = Number(left.substring(0, left.length - 2)) + Number(dw);
                        moveTop = moveTop > 0 ? 0 : moveTop;
                        moveLeft = moveLeft > 0 ? 0 : moveLeft;
                        moveTop = moveTop < maxHeight ? maxHeight : moveTop;
                        moveLeft = moveLeft < maxLeft ? maxLeft : moveLeft;
                        _this.pcBd.css("top", moveTop);
                        _this.pcBd.css("left", moveLeft);
                    }
                    oldEvent = event;
                }
            }));

            this.mapDom.click(function () {
                chatModule.chatCircle.removeClass('current');
                chatModule.sidebarRemove.click();
                popModule.bubble.removeClass("bubble-show");
                popModule.contentIconBox.removeClass("icon-hide");
            });
            this.leftArrow.click(function () {
                var left = _this.pcBd.css("left") + '';
                var moveLeft = Number(left.substring(0, left.length - 2)) + 80;
                moveLeft = moveLeft > 0 ? 0 : moveLeft;
                _this.pcBd.css("left", moveLeft);
            })
            this.leftArrow.mousedown(function () {
                timer1 = setInterval(() => {
                    var left = _this.pcBd.css("left") + '';
                    var moveLeft = Number(left.substring(0, left.length - 2)) - 80;
                    var moveLeft = Number(left.substring(0, left.length - 2)) + 80;
                    moveLeft = moveLeft > 0 ? 0 : moveLeft;
                    _this.pcBd.css("left", moveLeft);
                }, 30);
            })
            this.leftArrow.mouseup(function () {
                clearInterval(timer1);
            })
            this.rightArrow.click(function () {
                var left = _this.pcBd.css("left") + '';
                var moveLeft = Number(left.substring(0, left.length - 2)) - 80;
                moveLeft = moveLeft < maxLeft ? maxLeft : moveLeft;
                _this.pcBd.css("left", moveLeft);
            })
            this.rightArrow.mousedown(function () {
                timer2 = setInterval(() => {
                    var left = _this.pcBd.css("left") + '';
                    var moveLeft = Number(left.substring(0, left.length - 2)) - 80;
                    moveLeft = moveLeft < maxLeft ? maxLeft : moveLeft;
                    _this.pcBd.css("left", moveLeft);
                }, 30);
            })
            this.rightArrow.mouseup(function () {
                clearInterval(timer2);
            })
            this.topArrow.click(function () {
                var top = _this.pcBd.css("top") + '';
                var moveTop = Number(top.substring(0, top.length - 2)) + 80;
                moveTop = moveTop > 0 ? 0 : moveTop;
                _this.pcBd.css("top", moveTop);
            })
            this.topArrow.mousedown(function () {
                timer3 = setInterval(() => {
                    var top = _this.pcBd.css("top") + '';
                    var moveTop = Number(top.substring(0, top.length - 2)) + 80;
                    moveTop = moveTop > 0 ? 0 : moveTop;
                    _this.pcBd.css("top", moveTop);
                }, 30);
            })
            this.topArrow.mouseup(function () {
                clearInterval(timer3);
            })
            this.bottomArrow.click(function () {
                var top = _this.pcBd.css("top") + '';
                var moveTop = Number(top.substring(0, top.length - 2)) - 80;
                moveTop = moveTop < maxHeight ? maxHeight : moveTop;
                _this.pcBd.css("top", moveTop);
            })
            this.bottomArrow.mousedown(function () {
                timer4 = setInterval(() => {
                    var top = _this.pcBd.css("top") + '';
                    var moveTop = Number(top.substring(0, top.length - 2)) - 80;
                    moveTop = moveTop < maxHeight ? maxHeight : moveTop;
                    _this.pcBd.css("top", moveTop);
                }, 30);
            })
            this.bottomArrow.mouseup(function () {
                clearInterval(timer4);
            })

        },

        bindPhone: function () {
        },

        init: function () {
            this._init();
            this.bind();
            if (window.screen.width < 500) {
                this.bindPhone();
            }
        },
    }

    var chatModule = {
        _init: function () {
            this.chatCircle = $(".chat-circle");
            this.sidebarRemove = $(".sidebar-remove");
            this.phoneMapMenu = $("#phone-map-menu");
        },

        bind: function () {
            var _this = this;
            this.chatCircle.click(function () {
                var id = "#" + $(this).data("id");

                $(".sidebar-show").removeClass("sidebar-show");
                if ($(this).hasClass('current')) {
                    $(this).removeClass('current');
                    $(id).removeClass("sidebar-show");
                }
                else {
                    _this.chatCircle.removeClass('current');
                    $(this).addClass('current');
                    $(id).addClass("sidebar-show");
                }
                event.stopPropagation();
            });
            this.phoneMapMenu.find("li").click(function () {
                var id = "#" + $(this).data("id");
                var thisIdDom = $(id);
                if (thisIdDom.hasClass('sidebar-show')) {
                    $(".sidebar-show").removeClass("sidebar-show");
                }
                else {
                    $(".sidebar-show").removeClass("sidebar-show");
                    thisIdDom.addClass("sidebar-show");
                }
                event.stopPropagation();
            });
            this.sidebarRemove.click(function () {
                $(this).parents("").find(".sidebar-show").removeClass("sidebar-show");
            });
        },

        init: function () {
            this._init();
            this.bind();
        }
    }

    var popModule = {
        _init: function () {
            this.contentIconBox = $(".content-icon-box");
            this.contentIcon = $(".content-icon");
            this.bubble = $(".bubble");
        },
        bind: function () {
            var _this = this;
            this.contentIconBox.click(function () {
                _this.bubble.removeClass("bubble-show");
                _this.contentIconBox.removeClass("icon-hide")
                $(this).addClass("icon-hide")
                var id = $(this).find('.content-icon').data("id");
                var className = "." + id + '-bubble';
                $(className).addClass("bubble-show");
                event.stopPropagation();
            });
            this.bubble.click(function () {
                _this.contentIconBox.removeClass("icon-hide");
                _this.bubble.removeClass("bubble-show");
            });
        },
        init: function () {
            this._init();
            this.bind();
        }
    }


    mapModule.init();
    chatModule.init();
    popModule.init();
})