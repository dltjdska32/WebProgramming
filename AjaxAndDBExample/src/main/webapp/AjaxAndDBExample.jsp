	<%@ page language="java" contentType="text/html; charset=UTF-8"
	    pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
	    
	<%@ page import="java.util.ArrayList" %>
	<%@ page import="java.sql.*" %>
	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	</head>
	<body>
	
	<%
		String id = request.getParameter("id");
		String pass = request.getParameter("pass");
		
		Connection con = null;
		Statement stmt = null;
		String driverName = "com.mysql.jdbc.Driver";
		String dbURL = "jdbc:mysql://localhost:3306/member";
		
		try{
		
			Class.forName(driverName);
			con = DriverManager.getConnection(dbURL, "root", "1234");
			stmt = con.createStatement();
			ResultSet result = stmt.executeQuery("select * from member;");
		
		 	while(result.next()){
				//사용자에게 받은 id와 pass가 같다면 out.print를 통해 sNum을 보냄.
				if(id.equals(result.getString(1)) && pass.equals(result.getString(2))){
					String sNum = result.getString(3);
					out.write(sNum);
				} 
			}
			 
		} catch (Exception e){
			out.print("Mysql 데이터베이스 접속에 오류 발생");
			e.printStackTrace();
		} finally {
			if(stmt != null) stmt.close();
			if(con != null) con.close();
		}
	%>
	
	</body>
	</html>