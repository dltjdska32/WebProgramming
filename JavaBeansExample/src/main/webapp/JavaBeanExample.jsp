<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>


<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>JavaBeansExample</title>
</head>
<body>
	<%request.setCharacterEncoding("utf-8");%>
	<h2> 아래에 입력받은 학생 정보를 모두 출력합니다.</h2>
	
	<hr>
	
	<jsp:useBean id="information" class="JavaBean.BeanExample" scope="page"/>
	
	<jsp:setProperty property="*" name="information"/>

	<jsp:setProperty name="information" property="age" param="year"/>
	
	<h2> 빈즈에 저장된 값을 출력합니다.</h2>
	<hr>
	
	<label> 학생 이름 : </label>
	<jsp:getProperty name="information" property="name"/> <br>
	
	<label> 학생 나이 : </label>
	<jsp:getProperty name="information" property="age"/> <br>
	
	<label> 생년월일 : </label>
	<jsp:getProperty name="information" property="year"/> <br>
	
	<label> 학생 학번 : </label>
	<jsp:getProperty name="information" property="studentId"/> <br>

	<label> 학생 ID : </label>
	<jsp:getProperty name="information" property="id"/> <br>

	<label> 학생 비밀번호 : </label>
	<jsp:getProperty name="information" property="pass"/> <br>

	<label> Email : </label>
	<jsp:getProperty name="information" property="email"/> <br>

</body>
</html>
