var text = []
var lan = sessionStorage.getItem('ANGULAR_PERSISTENCE_STORAGE::lan') ? JSON.parse(sessionStorage.getItem('ANGULAR_PERSISTENCE_STORAGE::lan')).data : 'en';
if (lan == 'zh-cn') {
    text = [
        {
            title: '创意部门', content: "创意部门是前沿团队，致力于发展创造性和想象力的产品，<br> 通过头脑风暴，提案和投票直到方案实施"
        },
        {
            title: '技术部门', content: "让创意得到实现，解决技术问题和用户体验，<br>同时优化配置和强化功能"
        },
        {
            title: '市场部门', content: "提升品牌形象，了解行业动态，提出市场的需求给到创意部门，<br>为bi的完善起到至关重要的作用"
        },
        {
            title: '客服部门', content: "帮助用户更快和更好的了解产品，<br>收集用户的反馈以及意见以便更好提升产品品质。"
        }
    ]
} else {
    text = [
        {
            title: 'Creative Department', content: "Creative Department is an advanced team, which devoted themselves to."
        },
        {
            title: 'Technical Dept', content: "Make creativeness realized and work out technical issues and user experience."
        },
        {
            title: 'Marketing Dept', content: "Promote brand image, understand industry trends, and propose market demands to creative department."
        },
        {
            title: 'Customer Service Department', content: "Help users to better and faster understand the products."
        }
    ]
}


function switchLan() {
    var lan = JSON.parse(sessionStorage.getItem('ANGULAR_PERSISTENCE_STORAGE::lan')).data;
    if (lan == 'zh-cn') {
        text = [
            {
                title: '创意部门', content: "创意部门是前沿团队，致力于发展创造性和想象力的产品，<br> 通过头脑风暴，提案和投票直到方案实施"
            },
            {
                title: '技术部门', content: "让创意得到实现，解决技术问题和用户体验，<br>同时优化配置和强化功能"
            },
            {
                title: '市场部门', content: "提升品牌形象，了解行业动态，提出市场的需求给到创意部门，<br>为bi的完善起到至关重要的作用"
            },
            {
                title: '客服部门', content: "帮助用户更快和更好的了解产品，<br>收集用户的反馈以及意见以便更好提升产品品质。"
            }
        ]
    } else {
        text = [
            {
                title: 'Creative Department', content: "Creative Department is an advanced team, which devoted themselves to."
            },
            {
                title: 'Technical Dept', content: "Make creativeness realized and work out technical issues and user experience."
            },
            {
                title: 'Marketing Dept', content: "Promote brand image, understand industry trends, and propose market demands to creative department."
            },
            {
                title: 'Customer Service Department', content: "Help users to better and faster understand the products."
            }
        ]
    }


}


$(document).ready(function () {
    var flipModula = {
        _init: function () {
            this.flipBox = $(".flip");
            this.showText = $(".figure-explain");
            this.showTitle = this.showText.find("h2");
            this.showContent = this.showText.find("p");
            this.windowWidth = document.documentElement.clientWidth;
        },
        bind: function () {
            //默认第一个展开
            this.showTitle.html(text[0]);
            this.showContent.html(text[0]);
            this.flipBox.eq(0).addClass("hover");
            var _this = this;
            this.flipBox.hover(function () {
                var index = $(this).data("id");
                var textObj = text[index];
                _this.showTitle.html(textObj.title);
                _this.showContent.html(textObj.content);
                _this.showText.removeClass("hide");
                _this.flipBox.removeClass("hover");
                _this.flipBox.eq(index).addClass("hover");
            }, function () {
            });
            this.flipBox.click(function () {
                if (_this.windowWidth < 480) {
                    _this.showText.addClass("hide");
                    var index = $(this).data("id");
                    var textObj = text[index];
                    _this.showTitle.html(textObj.title);
                    _this.showContent.html(textObj.content);
                    _this.showText.removeClass("hide");
                }
            });
        },
        init: function () {
            this._init();
            this.bind();
        }
    }
    flipModula.init();
})