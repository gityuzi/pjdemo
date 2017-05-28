$(function() {
	var len=$('.containner li').length; //循环图片的总数
	var isMoving = false; //不知道存在的理由是什么,循环的判断条件
	var indexCurr = 0; //当前图片的index
	var timer = 800; //动画过度时间
	var intervaltimer = 0; // 循环停留时间


	//循环slide函数
	function slide(mode){ 
		if (isMoving == false) {
			isMoving = true;
			var prev,curr,next,hidden; // 定义当前，上一张，下一张以及下一张的下一张
			curr = $('.image' + indexCurr); //当前图片

			//如果当前图片为第一张
			if (indexCurr == 0) { 
				prev = $('.image' + (len - 1)); // 上一张为最后一张			
			} else {
				prev = $('.image' + (indexCurr - 1)); //上一张为之前一张
			}

			// 如果当前图片为最后一张
			if (indexCurr == (len -1)) { 
				next = $('.image0'); // 下一张为第一张
			} else {
				next = $('.image' + (indexCurr + 1)); // 下一张为接下来一张
			}

			if (mode) { // 如果mode为true，则执行类似prev
				if ((indexCurr - 2) >= 0 ) {
					hidden = $('.image' +　(indexCurr -2));
				} else {
					hidden = $('.image' + (indexCurr - 2 + len));
				}

				prev.css('z-index','5');
				curr.css('z-index','3');
				next.css('z-index','2');
				hidden.css('z-index','3');

				hidden.css({width: '550px',height: '270px',left: '100px',top: '75px',opacity: 0});
				hidden.animate({width: '550px',height: '270px',left: '100px',top: '75px',opacity: 1},timer);
				curr.stop(true,true).animate({width: '550px',height:'270px',left:'550px',top:'75px',opacity: 1},timer);
				next.stop(true,true).animate({width: '550px',height:'270px',left:'550px',top:'75px',opacity: 0},timer);
				prev.find('.cover').css('opacity','0');
				prev.stop(true,true).animate({width: '600px',height:'327px',left:'300px',top:'50px',opacity: 1},timer,function(){
					isMoving = false; // 这个一定要存在 是判断循环的条件 ，存在那无所谓，循环完，要是FALSE就可以
				});
				indexCurr --;
			} else { // 执行正真的循环，next
				if ((indexCurr +　2) >= len) { //hidden相当于下下张，所以当大于len时
					hidden = $('.image' + (indexCurr + 2 - len)); // 下下张为加2后减去总长
				} else {
					hidden = $('.image' + (indexCurr + 2)); // 下下张直接加2
				}

				prev.css('z-index','2'); //不能加在animate里面，动画会很奇怪
				curr.css('z-index','4');
				next.css('z-index','5');
				hidden.css('z-index','3');

				hidden.css({width: '550px',height: '270px',left: '550px',top: '75px',opacity: 0});
				hidden.stop(true,true).animate({width: '550px',height: '270px',left: '550px',top: '75px',opacity: 1},timer); // 下下张变成下张
				curr.stop(true,true).animate({width: '550px',height:'270px',left:'100px',top:'75px',opacity: 1},timer);// 当前变成上一张
				prev.stop(true,true).animate({width: '550px',height:'270px',left:'100px',top:'75px',opacity: 0},timer);// 之前一张变成隐藏，并移到下一张背后
				next.find('.cover').css('opacity','0');
				next.stop(true,true).animate({width: '600px',height:'327px',left:'300px',top:'50px',opacity: 1},timer,function(){	
					isMoving = false; // 这个一定要存在 是判断循环的条件 ，存在那无所谓，循环完，要是FALSE就可以
				}); // 下一张变成当前
				indexCurr ++; // 自加，完成循环
			}
			hidden.find("span").css("opacity",0.5);
			curr.find("span").css("opacity",0.5);


			if (indexCurr == len) { // 当当前序号和长度相等时，当前序号变为0.从头开始循环
				indexCurr = 0;
			}
			if (indexCurr < 0) {
				indexCurr = indexCurr + len;
			}
			$('.dot span').removeClass('current').eq(indexCurr).addClass('current'); // 下面的点添加class，会移动。
		} 
	}




	if (len>3) { // 图片多余三张的时候才有循环函数
		
		
		$('.containner .dot span').on('click',function () {
			var indexClick = $(this).index();
			var mode = false;

			if (indexClick == indexCurr) return;
			clearInterval(intervaltimer);
			intervaltimer=null;//循环后的循环时间重置

			if (Math.abs((indexClick - indexCurr)) > 1 && Math.abs(len - Math.abs(indexCurr-indexClick)) != 1) { // 点击与当前显示之间大于1，且不是首尾
				$('.containner li').css({width: '550px',height:'270px',left:'550px',top:'75px',opacity: 0});
				if (indexCurr > indexClick && Math.abs(len - Math.abs(indexCurr-indexClick)) != 1) { // 点击大于当前，且不是首尾
					mode = true; 
					indexCurr = indexClick + 1;
				} else { // 点击小于当前，且不是首尾
					indexCurr = indexClick -1;
					if (indexCurr < 0) {
						indexCurr = len -1;
					}
				}

			} else { // 点击与当前相邻
				if((indexCurr > indexClick && len-(indexCurr - indexClick) != 1) || (indexCurr < indexClick && len+(indexCurr - indexClick) == 1)){
					mode=true;			//执行上一张
				}
			}
			slide(mode);
			intervaltimer=setInterval(slide,3000); // 运行循环函数
		});

		$('.containner li').on('mousemove',function() {//鼠标移入为当前正中显示的图片li，则清除定时器
			if ($(this).css('width') == '600px') {
				clearInterval(intervaltimer);
				intervaltimer=null;
			}
		}).on('mouseout',function() { // 鼠标移除，恢复
			clearInterval(intervaltimer);
			intervaltimer=null;
			intervaltimer=setInterval(slide,3000);
		});


		$('.containner .pre').on('click',function() { //上一张
			clearInterval(intervaltimer);
			intervaltimer=null;
			slide(1);
			intervaltimer=setInterval(slide,3000);
		});
		$('.containner .next').on('click',function() { // 下一张
			if (isMoving) { return };
			clearInterval(intervaltimer);
			intervaltimer=null;
			slide();
			intervaltimer=setInterval(slide,3000);
		});


		intervaltimer=setInterval(slide,3000); // 运行循环函数

	} else {
		$('.containner .pre,.containner .next').hide();
	}




});