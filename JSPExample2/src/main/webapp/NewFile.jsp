<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.time.LocalTime" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>JSPExample2</title>
</head>
<body>
	<%request.setCharacterEncoding("UTF-8");%>
	
	<%!
	// gcd 구하는 함수
	public int gcd(int num1, int num2){
		//둘중 작은 수를 n에 저장
		int k = num1;
		int j = num2;
		int n = 0;
		
		if(k < j){
			n = k;
		} else {
			n = j;
		}
		
		//나눈 값들을 저장하기위해 ArrayList를 사용
		ArrayList<Integer> arr = new ArrayList<>();
		//arr에 두값 중 작은 값부터 --해가면서 공약수를 구하고 arr에 하나씩 추가
		for(int i = n; i >= 2; i--){
			if(k % i == 0 && j % i == 0){
				
				arr.add(i);
				k /= i;
				j /= i;
			}
		}
		
		int number = 1;
		//number값에 공약수를 모두 곱한다.
		for(int i = 0; i < arr.size(); i++){
			number *= arr.get(i);
		}
		return number;
	}
	
	// lcm 구하는 함수
	public int lcm(int num1, int num2){
		ArrayList<Integer> arr = new ArrayList<>();
		int number = 1;
		int n = 0;
		if(num1 > num2){
			n = num2;
		} else {
			n = num1;
		}
		
		for (int i = n; i >= 1; i--){
			
			if(num1 % i == 0 && num2 % i == 0){
				arr.add(i);
				num1 /= i;
				num2 /= i;
			}
			//서로소를 arr에 추가		
			if(i == 2 && (num1 % i != 0 || num2 % i != 0)){
				arr.add(num1);
				arr.add(num2);
			}
		
		}
		
		for(int i = 0; i < arr.size(); i++){
			number *= arr.get(i);
		}
		return number;
	}
	
	int count = 0;
	%>
	
	
	<h2>GCD, LCM 프로그램</h2>
	<hr>
	
	<%
	int num1 = Integer.parseInt(request.getParameter("Number1"));
	int num2 = Integer.parseInt(request.getParameter("Number2"));
	
	%>
	
	<%
	out.println("<hr><p> NUM1 : " + num1 + "<br>"); 
	out.println("NUM2 : " + num2 + "<br>");
	
	out.println("GCD(" + num1 + ", " + num2 + ") : " + gcd(num1, num2) + "<br>");
	out.print("LCM(" + num1 + ", " + num2 + ") : " + lcm(num1, num2) + "<hr>");
	%>
	
	
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