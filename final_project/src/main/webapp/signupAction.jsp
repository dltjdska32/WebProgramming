<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="User.UserDAO" %>
<%@ page import="java.io.PrintWriter" %>
<jsp:useBean id="user" class="User.User" scope="page"/>
<jsp:setProperty name="user" property="userID" param="userID"/>
<jsp:setProperty name="user" property="userPassword" param="userPassword"/>
<jsp:setProperty name="user" property="userName" param="userName"/>
<jsp:setProperty name="user" property="phoneNum" param="phoneNum"/>
<jsp:setProperty name="user" property="birthDate" param="birthDate"/>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">

<title>책 사세요 로그인</title>

</head>
<body>
	<%request.setCharacterEncoding("utf-8");%>
	<%
		if(user.getUserID() == null || user.getUserPassword() == null || user.getUserName() == null ||
				user.getPhoneNum() == null || user.getBirthDate() == null){
			out.println("<script>");
			out.println("alert('모든 정보를 입력해주십시오.');");
		    out.println("history.back();");
		    out.println("</script>");
		}else{
			UserDAO userDAO = new UserDAO();
			
			// 유저 테이블이 없다면 테이블을 생성합니다.
			userDAO.createTableIfNotExist();
			
			// -1 제외값이 반환되면 회원정보 추가후 로그인창으로 <-> -1반환하면 아이디존재 경고메세지출력
		    int result = userDAO.signup(user);
		    if(result == -1){
		    	//회원가입 실패
		    	out.println("<script>");
			    out.println("alert('이미 존재하는 아이디입니다.');");
			    out.println("history.back();");
			    out.println("</script>");
		    }
		    else {
		    	//회원가입 성공 (로그인창으로 이동)
		        out.println("<script>");
		        out.println("location.href = 'login.jsp'");
		        out.println("</script>");
		    }
		}
		
		%>

</body>
</html>