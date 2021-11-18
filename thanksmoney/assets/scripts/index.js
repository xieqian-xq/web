/*@@@@@@@@@@@@@@@@@@@ PC版 start @@@@@@@@@@@@@@@@@@@*/
// 全局变量
var global = {
    slideSpeed: 1000,
    isIE: /msie/i.test(navigator.userAgent),
    isIElt10: /msie/i.test(navigator.userAgent) ? (/msie (\d+)\.\d+/ig).exec(navigator.userAgent)[1] * 1 < 10 : false
};

$(function () {
    initHelper.init();


});

var initHelper = {
    init: function () {
        if (global.isIElt10) {
            this.lowerIETip();
            return;
        }
        this.bannerSwiper();
        this.infoSwiper();
        // imgLoad();
    },
    // 低版本IE提示
    lowerIETip: function () {
        if (global.isIElt10) {
            $('body').addClass('dialog-open');
            $('.ie-tip').show();
        }
    },
    // 轮播图
    bannerSwiper: function () {
        // 轮播图
        var banner_Swiper = new Swiper('.banner-header', {
            autoplay: 5000,
            direction: 'horizontal', //滑动方向：默认水平 vertical（垂直）
            loop: true,
            // 如果需要分页器
            pagination: '.swiper-pagination',
            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev'
        });
    },
    // 信息展示框轮播图
    infoSwiper: function () {
        var info_Swiper = new Swiper('.info-body', {
            loop: true,
            effect: 'fade'
        });
        $('.info-tab li').hover(function () {
            var $this = $(this);
            info_Swiper.slideTo($this.index() + 1, global.slideSpeed, false);
        });
    },
    // 预加载图片
    preLoad: function () {
        var imgArray = [
        "App_Files/Images/banner1.jpg",
        "App_Files/Images/banner2.jpg",
        "App_Files/Images/banner3.jpg",
        "App_Files/Images/banner4.jpg",
        "App_Files/Images/banner5.jpg",
        "App_Files/Images/banner6.jpg",
        ];

        PreLoadImage(imgArray,
            function () {
                $(".loading").show();
            },
            function (currentPostion, imgArray) {
                var count = imgArray.length;
                var rate = (currentPostion / count * 100).toFixed(2);

                $('.img-progress').width(rate + "%");
                $('.img-progress-title').html(rate + "%");

                console.log(rate);
                if (currentPostion == count) {
                    console.log("加载完成");
                    $('.img-progress-title').html("预加载完成，即将跳转......");
                    setTimeout(function () {
                        $(".loading").hide();
                    }, 1000);
                }
            });
    }
};

// 图片预加载
function PreLoadImage(imgArray, beforeFunc, callback) {
    var imgLen, currentPostion = 0;
    imgArray = imgArray || [];
    imgLen = imgArray.length;

    if (imgLen <= 0) {
        return;
    }

    // 预加载之前执行函数
    if (typeof beforeFunc === "function") {
        beforeFunc();
    }

    $.each(imgArray, function (index, imgSrc) {
        var imgObj = new Image();
        $(imgObj).bind("load error", function () {
            currentPostion++;
            // 回调函数
            if (typeof callback === "function") {
                callback(currentPostion, imgArray);
            }
        });
        imgObj.src = imgSrc;
    });
}

/*@@@@@@@@@@@@@@@@@@@ PC版 end @@@@@@@@@@@@@@@@@@@*/

/*@@@@@@@@@@@@@@@@@@@ APP版 start @@@@@@@@@@@@@@@@@@@*/
var appGlobal = {
    slideSpeed: 300
};

$(function () {
    appInitHelper.init();
});

var appInitHelper = {
    init: function () {
        this.nav();
        this.banner();
    },
    // 导航条初始化
    nav: function () {
        // 打开导航
        $('.app-nav-open').click(function () {
            $('.app-nav-body').animate({ 'left': '-0%' }, appGlobal.slideSpeed);
            $('.app-nav-open').hide();
            $('body').addClass('dialog-open');
        });

        // 关闭导航
        $('.app-nav-close').click(function () {
            $('.app-nav-body').animate({ 'left': '-100%' }, appGlobal.slideSpeed, function () {
                $('.app-nav-open').show();
                $('body').removeClass('dialog-open');
            });
        });
    },
    // 轮播图
    banner: function () {
        var appSwiper = new Swiper('.app-banner-header', {
            autoplay: 5000,
            loop: true,
            pagination: '.swiper-pagination'
        });
    }
};

/*@@@@@@@@@@@@@@@@@@@ APP版 end @@@@@@@@@@@@@@@@@@@*/