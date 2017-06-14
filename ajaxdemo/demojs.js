// JavaScript Document

document.getElementById('search').onclick = function() {
	var request = new XMLHttpRequest();
	request.open("GET","servive.php?number=" + document.getElementById('keyword').value);
	request.send();
	request.onreadystatechange = function() {
		if(request.readyState === 4) {
			if(request.status === 200) {
				var data = JSON.parse(request.responseText);
				if(data.success) {
					document.getElementById('searchresult').innerHTML = data.msg;
				} else {
					document.getElementById('searchresult').innerHTML = " 出现错误:" + data.msg;
				}

			} else {
				alert('发生错误' + request.status);
			}
		}
	};
};

document.getElementById('save').onclick = function() {
	var request = new XMLHttpRequest();
	request.open("POST","servive.php");
	var data = "name=" + document.getElementById('staffname').value + "&number=" + document.getElementById('staffnumber').value + "&sex=" + document.getElementById('staffsex').value + "&job=" + document.getElementById('staffjob').value;
	request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	request.send(data);

	request.onreadystatechange = function() {
		if(request.readyState === 4) {
			if(request.status === 200) {
				var data = JSON.parse(request.responseText);
				if(data.success) {
					document.getElementById('createresult').innerHTML = data.msg;
				} else {
					document.getElementById('createresult').innerHTML = " 出现错误:" + data.msg;
				}
			} else {
				alert('发生错误' + request.status);
			}
		}
	};
};


