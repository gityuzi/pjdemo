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





























begin();
});