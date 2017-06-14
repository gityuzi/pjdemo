$(document).ready(function() {
	$('#search').on('click',function() {
		$.ajax({
			type: 'GET',
			url: 'servive.php?number=' + $('#keyword').val(),
			dataType: 'json',
			success: function(data) {
				if(data.success) {
					$('#searchresult').html(data.msg);
				} else {
			  		$('#searchresult').html(" 出现错误:" + data.msg);
			  	}
			},
			error: function(jqXHR){
				alert('发生错误:' + jqXHR.status);
			}
		});
	});
	$('#save').on('click',function() {
		$.ajax({
			type: 'POST',
			url: 'servive.php',
			dataType: 'json',
			data: {
				name: $('#staffname').val(),
				number: $('#staffnumber').val(),
				sex: $('#staffsex').val(),
				job: $('#staffjob').val(),
			},
			success: function(data) {
				if(data.success) {
					$('#createresult').html(data.msg);
				} else {
			  		$('#createresult').html(" 出现错误:" + data.msg);
			  	}
			},
			error: function(jqXHR){
				alert('发生错误' + jqXHR.status);
			}
		});
	});
});
	



