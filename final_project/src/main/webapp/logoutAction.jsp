<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">

<title>책 사세요 로그인</title>

</head>
<body>
	<%
		session.invalidate();
	%>

	<script>
		location.href = 'login.jsp';
	</script>
</body>
</html>