<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- ArrayList와 시분초 구하기위해 import한다. -->    
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.time.LocalTime" %>
<
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%! 
	//GCD 구하는 함수
	public int gcd(int num1, int num2){
		//둘중에 작은 수를 n에 저장한다.
		int k = num1;
		int j = num2;
		int n = 0;
		if(k < j){
			n = k;
		}else{
			n = j;
		}
		
		//나눈 값들을 저장하기위해 ArrayList로 arr을 만든다.
		ArrayList<Integer>arr = new ArrayList<>();
		//arr에 두값 중 작은값부터 --해가면서 공약수를 구하고 arr에 하나씩 추가한다.
		for(int i = n; i >= 1; i--){
			if(k % i == 0 && j % i == 0){
				arr.add(i);
			}
		}
		int number = 1;
		//number값에 공약수들을 모두 곱한다.
		for(int i = 0; i < arr.size(); i++){
			number *= arr.get(i);
		}
		return number;
	}
	
	int count = 0;
	
	%>
	
	<h1> GCD 프로그램 </h1>
	<%
	int num1 = 15;
	int num2 = 5; 
	%>
	<%out.println("<hr><p>NUM1 : " + num1 + "<br>");  %>
	<%out.println("NUM2 : " + num2 + "<br>" ); %>
	
	<%out.println("GCD(" + num1 + ", " + num2 +") : " +  gcd(15,5) + "<hr>"); %>
	
	<%
	String str;
	if(java.util.Calendar.getInstance().get(java.util.Calendar.HOUR_OF_DAY) >= 12)
		str = "오후";
	else
		str = "오전";
	
	LocalTime now = LocalTime.now();
	
	int hour = now.getHour();     
	int minute = now.getMinute();
	 
	%>

	
	지금 시각은 <% out.print(str + " "  + hour + "시 " + minute + "분 입니다.");  %>       현재  <%= ++count %>번 접속했습니다.
		
</body>
</html>