package JavaBean;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class BeanExample {
	
	private	String name;	// 이름  	
	private String age;		// 나이
	private	String year;	// 생년월일
	private String pass;	// 비밀번호
	private String email;	// 이메일
	private String id;		// 아이디
	private String studentId;  	// 학번

	public BeanExample() {}
	
	
	public BeanExample(String name, String age, String year, String id, String pass, String studentId, String email) {
		// TODO Auto-generated constructor stub
		this.name = name;
		this.age = age;
		this.year = year;
		this.id = id;
		this.pass = pass;
		this.studentId = studentId;
		this.email = email;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAge() {
		return age;
	}
	
	public void setAge(String year) {
		String[] bornDate = year.split("-");
		int bornYear = Integer.parseInt(bornDate[0]);
		int bornMonth = Integer.parseInt(bornDate[1]);
		int bornDay = Integer.parseInt(bornDate[2]);
		
		LocalDate now = LocalDate.now();
		
		int curYear = now.getYear();
		int curMonth = now.getMonthValue();
		int curDay = now.getDayOfMonth();
		
		int intAge = curYear - bornYear;
		//생일이 지나지 않았다면 1살 빼기
		if(bornMonth < curMonth) {
			intAge -= 1;
		}
		
		if(curMonth == bornMonth) {
			if(bornDay < curDay) {
				intAge -= 1;
			}
		}
		
		this.age = String.valueOf(intAge);
			
	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getStudentId() {
		return studentId;
	}
	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}

	
}

