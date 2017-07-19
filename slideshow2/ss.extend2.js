; (function ($, window, document, undefined) {
    $.fn.bannerSlide = function (options) {

        var ulClass = options.ulClass ? ("." + options.ulClass) : '.img';            //包裹每个轮播图的容器类名
        var numClass = options.numClass ? ("." + options.numClass) : '.num';        //包裹轮播图底部页码控制的容器类名
        var btnL = options.btnL ? ("." + options.btnL) : '.btn_l';                //上一张按钮
        var btnR = options.btnR ? ("." + options.btnR) : '.btn_r';                //下一张按钮
        var bannerWidth = options.bannerWidth ? options.bannerWidth : 0;            //轮播图宽度，number
        var timeInterval = options.timeInterval ? options.timeInterval : 2000;      //轮播的时间间隔，默认2秒切换一张banner，number
        var slideSpeed = options.slideSpeed ? options.slideSpeed : 500;            //轮播的速度(一张切到另一张的动画持续时间)，默认500ms，number
        var $that = this;

        var i = 0;
        //克隆节点，以实现无缝轮播
        var clone = this.find(ulClass + " li").first().clone();
        this.find(ulClass).append(clone);
        var length = this.find(ulClass + " li").length;
        for (var j = 0; j < length - 1; j++) {
            this.find(numClass).append("<li></li>");
        }
        this.find(numClass + " li").first().addClass("on");

        //鼠标划入圆点
        this.find(numClass + " li").hover(function () {
            var index = $(this).index();
            i = index;
            $that.find(ulClass).stop().animate({ left: -index * bannerWidth }, slideSpeed);
            $(this).addClass("on").siblings().removeClass("on");
        })

        //自动轮播
        var t = setInterval(function () {
            i++;
            move()
        }, timeInterval);

        //对banner定时器的操作
        this.hover(function () {
            clearInterval(t);
        }, function () {
            t = setInterval(function () {
                i++;
                move()
            }, timeInterval)
        })

        //向左的按钮
        this.find(btnL).click(function () {
            i--;
            move();
        })

        //向右的按钮
        this.find(btnR).click(function () {
            i++;
            move();
        })


        function move() {
            if (i == length) {
                $that.find(ulClass).css({ left: 0 });
                i = 1;
            }

            if (i == -1) {
                $that.find(ulClass).css({ left: -(length - 1) * bannerWidth });
                i = length - 2;
            }

            $that.find(ulClass).stop().animate({ left: -i * bannerWidth }, slideSpeed);

            if (i == length - 1) {
                $that.find(numClass + " li").eq(0).addClass("on").siblings().removeClass("on");
            } else {
                $that.find(numClass + " li").eq(i).addClass("on").siblings().removeClass("on");
            }
        }
    };

})(jQuery);