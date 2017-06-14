<?php
// 设置页面内容是HTML，编码格式utf-8
//header("Content-Type: text/plain;charset=utf-8");
header("Content-Type: application/json;charset=utf-8");
//header("Content-Type: text/xml;charset=utf-8");
//header("Content-Type: text/html;charset=utf-8");
//header("Content-Type: application/javascript;charset=utf-8");

//定义一个多维数组
$staff = array 
	(
		array("name" => "洪七","number" => "101","sex" => "男","job" => "总经理"),
		array("name" => "郭靖","number" => "102","sex" => "男","job" => "客户经理"),
		array("name" => "黄蓉","number" => "103","sex" => "女","job" => "产品经理")
	);

//判断  如果是get请求，则进行搜索。post请求，则进行新建
//$_SERVER是一个 超全局变量，在一个 脚本的全部作用域都可以 用，不用使用global关键字
//$_SERVER["REQUEST_METHOD"]返回 访问页面使用的请求方法
if ($_SERVER["REQUEST_METHOD"] == "GET") {
	search();
} elseif($_SERVER["REQUEST_METHOD"] == "POST") {
	create();
}


// 通过员工编号进行搜索 
function search() {
	//检查是否有员工编号的参数
	//isset检测变量是否设置，empty判断值是否为空
	//超全局变量$_GET $_POST用于收集表单数据
	if(!isset($_GET["number"]) || empty($_GET["number"])) {
		echo '{"success": false,"msg": "参数错误"}';
		return;
	}
	
	//
	//global关键词用于访问函数内的全局变量
	 global $staff;
	//获取number参数
	$number = $_GET["number"];
	$result = '{"success": false,"msg": "没有找到员工。"}';
	
	//遍历$staff 多维数组，查找key值为number的员工是否存在， 如果存在则修改返回结果
	foreach ($staff as $value) {
		if($value["number"] == $number) {
			$result = '{"success": true,"msg": "找到员工：员工编号：' .$value["number"] .' ，员工姓名：' . $value["name"] . '，员工性别： '. $value["sex"] .' ，员工职位：' . $value["job"].'"}';
			break;
		}
	}
	echo $result;
}	
	//创建员工
function create() {
	if(!isset($_POST["name"]) || empty($_POST["name"])
	  || !isset($_POST["number"]) || empty($_POST["number"])
	  || !isset($_POST["sex"]) || empty($_POST["sex"])
	  || !isset($_POST["job"]) || empty($_POST["job"])) {
		echo '{"success": false,"msg": "参数错误，员工信息填写不全"}';
		return;
	}
	//TODO:获取POST 表单数据并保存到数据库

	//提醒保存成功
	echo '{"success": true,"msg": "员工： '. $_POST["name"] .' 信息保存成功！"}';
}


?>
	
	
	
	
