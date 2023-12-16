<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="User.UserDAO" %>
<%@ page import="java.io.PrintWriter" %>
<jsp:useBean id="user" class="User.User" scope="page"/>
<jsp:setProperty name="user" property="userID" param="userID"/>
<jsp:setProperty name="user" property="userPassword" param="userPassword"/>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">

<title>책 사세요 로그인</title>

</head>
<body>
	<%request.setCharacterEncoding("utf-8");%>
	<%
		String userID = null;
		if(session.getAttribute("userID") != null){
			userID = (String) session.getAttribute("userID");	
		}
		if(userID != null){
			//이미 로그인된 사람 다시 로그인 불가
			out.println("<script>");
			out.println("alert('이미 로그인 되어있습니다.');");
	        out.println("location.href = 'trade.jsp'");
	        out.println("</script>");
		}
		UserDAO userDAO = new UserDAO();
	    int result = userDAO.login(user.getUserID(), user.getUserPassword());
	    
	    // 로그인 성공시 메인페이지로 이동.
	    if(result == 1){
	    	//로그인 성공시 로그인성공한 사용자에게 세션부여(로그인 여부 확인)
	    	session.setAttribute("userID", user.getUserID());
	        out.println("<script>");
	        out.println("location.href = 'trade.jsp';");
	        out.println("</script>");
	    }
	    //비번 틀리게 입력시 경고문 출력
	    else if(result == 0){
	        out.println("<script>");
	        out.println("alert('비밀번호가 틀립니다.');");
	        out.println("history.back();");
	        out.println("</script>");
	    }
	    //아이디 틀리게 입력시 경고문 출력
	    else if(result == -1){
	        out.println("<script>");
	        out.println("alert('존재하지 않는 아이디입니다.');");
	        out.println("history.back();");
	        out.println("</script>");
	    }
	    //디비 오류
	    else if(result == -2){
	        out.println("<script>");
	        out.println("alert('데이터베이스 오류 발생');");
	        out.println("history.back();");
	        out.println("</script>");
	    }
		%>

</body>
</html>