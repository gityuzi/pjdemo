<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>无标题文档</title>
</head>

<body>
<h1>这是一个测试页面</h1>
<?php
echo "hello world!"
?>

var jsondata = '{
	"staff":[
		{"name":"allen","number":40},
		{"name":"paul","number":50},
		{"name":"green","number":60}
	]
}';
var jsonbj = JSON.parse(jsondata);
alert(jsonbj.staff[0].name);

var jsondata = '{"staff":[{"name":"allen","number":40},{"name":"paul","number":50},{"name":"green","number":60}]}';
var jsonbj = JSON.parse(jsondata);
console.log(jsonbj.staff[0].name);
</body>
</html>
