;(function($,window,document,undefined) {
    $.fn.bannerSlide = function(options) {
        var ulClass = options.ulClass ? ("." + options.ulClass) : ".img";
        var numClass = options.numClass ? ("." + options.numClass) : ".num";
        var btnL = options.btnL ? ("." + options.btnL) : ".btn_l";
        var btnR = options.btnR ? ("." + options.btnR) : ".btn_r";
        var bannerWidth = options.bannerWidth ? options.bannerWidth : 0;
        var timeInterval = options.timeInterval ? options.timeInterval : 2000;
        var slideSpeed = options.slideSpeed ? options.slideSpeed : 500;
        var $that = this;
        var i = 0;

        var clone = this.find(ulClass + " li").first().clone();
        this.find(ulClass).append(clone);
        var length = this.find(ulClass + " li").length;
        for (var j = 0; j < length - 1; j++) {
            this.find(numClass).append("<li></li>");
        }
        this.find(numClass + " li").first().addClass("on");

        this.find(numClass + " li").hover(function() {
            var index = $(this).index();
            i = index;
            $that.find(ulClass).stop().animate({left: -index * bannerWidth},slideSpeed);
            $(this).addClass("on").siblings().removeClass("on");
        });

        var t = setInterval(function() {
            i++;
            move();
        },timeInterval);

        this.hover(function() {
            clearInterval(t);
        },function() {
            t = setInterval(function() {
                i++;
                move();
            },timeInterval);
        });

        this.find(btnL).click(function() {
            i--;
            move();
        });

        this.find(btnR).click(function() {
            i++;
            move();
        });

        function move () {
            if(i == length) {
                $that.find(ulClass).css({left: 0});
                i = 1;
            }
            if(i == -1) {
                $that.find(ulClass).css({left: -(length - 1) * bannerWidth});
                i = length - 2;
            }
            $that.find(ulClass).stop().animate({left: -i * bannerWidth},slideSpeed);

            if(i == length - 1) {
                $that.find(numClass + " li").eq(0).addClass("on").siblings().removeClass("on");
            } else {
                $that.find(numClass + " li").eq(i).addClass("on").siblings().removeClass("on");
            }
        }
    };
})(jQuery);

/**/