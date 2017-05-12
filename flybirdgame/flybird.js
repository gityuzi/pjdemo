$(function() {



function begin() {
	//标题移动
	var bg = document.getElementById('wrapper');
	var beginTitle = document.getElementById('begintitle');
	var beginBird = document.getElementById('beginbird');
	var Y =4;
	var index = 0;
	var imageArr = ['images/bird0.png','images/bird1.png'];
	var titleTimer = setInterval(titleWave,500);
	function titleWave () {
		Y *= -1;
		beginTitle.style.top = beginTitle.offsetTop + Y + 'px';
		beginBird.src = imageArr[index++];
		if (index == 2) { 
			index = 0;
		}
	}

	
	//草地移动
	var grass1 = document.getElementById('grass1');
	var grass2 = document.getElementById('grass2');
	var grass = document.getElementById('grass');
	var score = document.getElementById('score');
	var num1 = document.getElementById('num1');
	var num2 = document.getElementById('num2');
	var num3 = document.getElementById('num3');
	var scoreNow = 0; 
	var blockArr = new Array();
	var blockDistance = baseObj.randomNum(130,250);
	var grassTimer = setInterval(grassMove,30);
	function grassMove () {
		if (grass1.offsetLeft <= -343) {
			grass1.style.left = '343px';
		}
		if (grass2.offsetLeft <= -343) {
			grass2.style.left = '343px';
		}
		grass1.style.left = grass1.offsetLeft - 3 + 'px';
		grass2.style.left = grass2.offsetLeft - 3 + 'px';


		if (blockArr.length) {
			for (var i = 0; i < blockArr.length; i++) {
				blockArr[i].moveBlock();
				var x = baseObj.examine(blockArr[i].downDivWrap,bird.div);
				var y = baseObj.examine(blockArr[i].upDivWrap,bird.div);
				var z = bird.div.offsetTop >= 390;
				if (x || y || z) {
					window.clearInterval(grassTimer);
					bird.fallSpeed = 0;
					bg.onclick = null;
					gameover.style.display = 'block';
					score.style.display = 'none';
				}
			}
			if (blockArr[blockArr.length - 1].downDivWrap.offsetLeft < (450 - blockDistance)) {
				blockDistance = baseObj.randomNum(130,250);
				var newBlock = new block();
				newBlock.createBlock();
				blockArr.push(newBlock);
			}
			if (blockArr[0].downDivWrap.offsetLeft == -12) {
				scoreNow++;
				if (scoreNow < 10) {
					num1.style.backgroundImage = 'url(images/' + scoreNow + '.jpg)';
				} else if (scoreNow < 100) {
					num2.style.display = 'block';
					num1.style.backgroundImage = 'url(images/' + parseInt(scoreNow/10) + '.jpg)';
					num2.style.backgroundImage = 'url(images/' + scoreNow%10 + '.jpg)';
				} else if (scoreNow < 1000) {
					num3.style.display = 'block';
					num1.style.backgroundImage = 'url(images/' + parseInt(scoreNow/100) + '.jpg)';
					num2.style.backgroundImage = 'url(images/' + parseInt(scoreNow/10)%10 + '.jpg)';
					num3.style.backgroundImage = 'url(images/' + scoreNow%10 + '.jpg)';
				}
				return scoreNow;
				
			}console.log(scoreNow);
			if (blockArr[0].downDivWrap.offsetLeft < -50) {
				bg.removeChild(blockArr[0].downDivWrap);
				bg.removeChild(blockArr[0].upDivWrap);
				blockArr.shift(blockArr[0]);
			}
		}
		
	}
	
	//start按钮
	
	var start = document.getElementById('start');
	start.onclick = function () {
		
		beginTitle.style.display = 'none';
		clearInterval(titleWave);
		start.style.display = 'none';
		bird.showBird(bg);
		bird.flyBird();
		bird.wingWave();
		bg.onclick = function () {
			bird.fallSpeed = -8;
		};
		var b = new block();
		b.createBlock();		
		blockArr.push(b);
		num1.style.display = "block";
	};	
	var ok = document.getElementById('ok');
	var gameover = document.getElementById('gameover');
	ok.onclick = function() {
		window.location.href = 'flybird.html';
	};
}
/*
var baseObj = {
	randomNum: function (min,max) {
		return parseInt(Math.random() * (max - min + 1) + min);
	},

	examine: function(obj1,obj2) {
		var obj1Left = obj1.offsetLeft;
		var obj1Width = obj1.offsetLeft + obj1.offsetWidth;
		var obj1Top = obj1.offsetTop;
		var obj1Height = obj1.offsetTop + obj1.offsetHeight;

		var obj2Left = obj2.offsetLeft;
		var obj2Width = obj2.offsetLeft + obj2.offsetWidth;
		var obj2Top = obj2.offsetTop;
		var obj2Height = obj2.offsetTop + obj2.offsetHeight;

		if (!(obj1Left > obj2Width || obj1Width < obj2Left || obj1Top > obj2Height || obj1Height < obj2Top)) {
			return true;
		}
		return false;
	},

};

function block () {
	var bg = document.getElementById('wrapper');
	this.upDivWrap = null;
	this.downDivWrap = null;
	this.downHeight = baseObj.randomNum(0,150);
	this.gapHeight = baseObj.randomNum(150,160);
	this.upHeight = 312 - this.downHeight - this.gapHeight;

	this.createDiv = function(url,height,positionType,left,top) {
		var newDiv = document.createElement('div');
		newDiv.style.width = '62px';
		newDiv.style.height = height;
		newDiv.style.position = positionType;
		newDiv.style.left = left;
		newDiv.style.top = top;
		newDiv.style.backgroundImage = url;
		return newDiv;
	};
	this.createBlock = function () {
		var upDiv1 = this.createDiv('url(images/up_mod.png)',this.upHeight + 'px');
		var upDiv2 = this.createDiv('url(images/up_pipe.png)','60px');
		this.upDivWrap = this.createDiv(null,null,'absolute','450px','0');//450为水管产生的位置距离游戏屏幕最左边的长度
		this.upDivWrap.appendChild(upDiv1);
		this.upDivWrap.appendChild(upDiv2);


		var downDiv1 = this.createDiv('url(images/down_pipe.png)','60px');
		var downDiv2 = this.createDiv('url(images/down_mod.png)',this.downHeight + 'px');
		this.downDivWrap = this.createDiv(null,null,'absolute','450px',363 - this.downHeight + 'px');
		this.downDivWrap.appendChild(downDiv1);
		this.downDivWrap.appendChild(downDiv2);

		
		bg.appendChild(this.upDivWrap);
		bg.appendChild(this.downDivWrap);
	};
	this.moveBlock = function (){
		//alert(this.upDivWrap.style.left);
		//alert(this.downDivWrap.style.left);
		this.upDivWrap.style.left = this.upDivWrap.offsetLeft - 3 + 'px';
		this.downDivWrap.style.left = this.downDivWrap.offsetLeft - 3 + 'px';
	};
}



var bird = {
		flyTimer: null,
		wingTimer: null,
		div: document.createElement('div'),
		showBird: function(parentObj) {
			this.div.style.width = '40px';
			this.div.style.height = '28px';
			this.div.style.backgroundImage = 'url(images/bird0.png)';
			this.div.style.backgroundRepeat = 'no-repeat';
			this.div.style.position = 'absolute';
			this.div.style.left = '50px';
			this.div.style.top = '200px';
			parentObj.appendChild(this.div);
		},

		fallSpeed: 0,
		flyBird: function() {
			bird.flyTimer = setInterval(fly,40);
			function fly () {
				bird.div.style.top = bird.div.offsetTop + bird.fallSpeed++ + 'px';
				if (bird.div.offsetTop < 0) {
					bird.fallSpeed = 2;
				}
				if (bird.div.offsetTop >= 395) {
					bird.fallSpeed = 0;
					clearInterval(bird.flyTimer);
					clearInterval(bird.wingTimer);
				}
				if (bird.fallSpeed > 12) {
					bird.fallSpeed =12;
				}
			}
		},
		wingWave: function() {
			var up = ['url(images/up_bird0.png)','url(images/up_bird1.png)'];
			var down = ['url(images/down_bird0.png','url(images/down_bird1.png)'];
			var i = 0;
			var j = 0;
			birdWingTimer = setInterval(wing,120);
			function wing () {
				if (bird.fallSpeed > 0) {
					bird.div.style.backgroundImage = down[i++];
					if (i == 2) {
						i = 0;
					}
				}
				if (bird.fallSpeed < 0) {
					bird.div.style.backgroundImage = up[j++];
					if (j == 2) {
						j = 0;
					}
				}
			}
		}

	};*/




























begin();
});