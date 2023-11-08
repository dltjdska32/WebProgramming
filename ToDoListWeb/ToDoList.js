//캘린더를 담을 전역변수    
var calendar;

//fullcalendar의 info객체 멤버함수 dateStr담기위한 변수
var dateString = "";

//일정들을 담을 객체를 저장할 리스트
var infoList = [];

//일정을 담을 객체
class information{
    constructor(date, time, schedule, alarm, targetDate){
        this.date = date;
        this.time = time;
        this.schedule = schedule;
        this.alarm = alarm;
        this.targetDate = targetDate

    }

    //날짜, 시간에따라 sort하기위한 멤버함수들 생성
    separateByYear(){
        var separateDate = this.date.split("-");
        return parseInt(separateDate[0]);
    }

    separateByMonth(){
        var separateDate = this.date.split("-");
        return parseInt(separateDate[1]);
    }

    separateByDay(){
        var separateDate = this.date.split("-");
        return parseInt(separateDate[2]);
    }

    separateByHour(){
        var separateTime = this.time.split(":");
        return parseInt(separateTime[0]);
    }

    separateMinute(){
        var separateTime = this.time.split(":");
        return parseInt(separateTime[1]);
    }
}




// -------------------- 캘린더 생성 ------------------------------
    //section 아이디값을 가져온다.

    const calendarEl = document.getElementById('calendar');

    //전역변수 calendar에 캘린더를생성하고 저장
    calendar = new FullCalendar.Calendar(calendarEl, {

        //달력형식은 행렬형식의 일반적인달력으로 보여준다
        initialView: 'dayGridMonth',

        //달력의 헤더부분 수정 (간단하게 전달이동 - 현재 년,월 - 다음달으로 교체)
        headerToolbar: {
            left: 'prev',
            center: 'title',
            right: 'next'
        },

        //헤더의 현재 년,월 교체 (yyyy년 mm월 -> yyyy.mm)
        //date매개변수는 javaScript의 Date객체와 유사한 정보를 포함.
        titleFormat: function (date){
             //fullcalendar에서 반환되는 달의 값은 0부터 시작 따라서 +1을 해준다.
             if ( date.date.month < 9){ 
                return `${date.date.year}. ${"0"+(date.date.month + 1)}`;
            }
            return `${date.date.year}. ${date.date.month + 1}`;
        },

        //달력을 한국어로 설정
        locale: "ko",

        //달력내 날짜를 클릭시 발생하는 이벤트핸들러 (dateClick)
        //이벤트 발생시 함수실행
        //info는 dateClick핸들러가 받는 매개변수 (클릭된 날짜의 정보를 담는 객체)
        //info.dataStr은 2023-11-11이런식으로 반환
        dateClick: function(info){
            //달력 날짜 클릭시 시간 입력 상자에 포커스
            document.getElementById('appt').focus();

            //날짜를 문자열로 가져와 dateString에 저장함 (keydown이벤트시 캘린더에 일정을 저장하기위함)
            dateString = info.dateStr;
        }

    });
//---------------------------------------------------------------

// dateClick 핸들러에서 받아온 dateString값을 사용한다.
// 텍스트창(id : input)에서 키다운이벤트(enter)가 일어나면 실행 
document.getElementById('input').addEventListener('keydown', function(event) {
    if(event.key === 'Enter'){


        if(dateString === ""){
            alert("날짜를 선택하지 않았습니다. \n달력에서 날짜를 먼저 선택해주세요.");
            document.getElementById('input').value = ""; 
            return;
        }

        //trim() 함수는 공백제거함수
        // 텍스트의 값을 가져와 공백이아니라면 info 객체에 텍스트에 입력값을 넣기위함
        var input = document.getElementById('input').value.trim();
        
         //텍스트창에 입력을 받지 않았다면 함수종료
         if(input === ""){
            alert("스케줄을 입력하지 않았습니다.\n다시 입력해주세요.");
            return;
        }

        //입력받은 시간을 가져와서 time에 추가한다.
        var appt = document.getElementById('appt').value;

        if(appt === ""){
            alert("시간을 입력하지 않았습니다. \n시간을 입력해주세요.");
            return;
        }

        var alarm = document.getElementById('alarm').value;

        //일정을 담을 객체생성
        var inf = new information(dateString, appt, input, alarm); 

        //배열의 앞에 객체를 저장 <-> push 함수는 배열의 끝에 추가.
        infoList.unshift(inf);

        console.log(infoList);
        //정련된 리스트를 제이슨파일에 저장하기위해 sortList()함수를 사용한다.
        //이렇게하면 데이터를 뽑아올때 쉽게 뽑아올 수 있다.
        sortInfoList();

        console.log(infoList);

        var input = "[" + appt + "] " + input;

        calendar.addEvent({
            title: input,
            start: dateString
        });

        //일정을 추가하고 캘린더를 다시보여준다.
        calendar.render();

        // infoList가 갱신되었으므로 로컬스토리지의 값도 갱신한다.
        localStorage.setItem('scheduleList', JSON.stringify(infoList));
        
        console.log(localStorage.getItem('scheduleList'));
   
        // iframe(자식 웹페이지 )에도 부모 웹페이지 로컬스토리지 공유
        var iframeWeb = document.getElementById('childWeb').contentWindow;
        var storageValue = localStorage.getItem("scheduleList");

        //iframeWe주소(자식주소) 에만 storageValue의 값을 보냄
        iframeWeb.postMessage(storageValue, 'http://127.0.0.1:5500');

        //날짜(dateClick핸들러에서받은 전역변수 dateStirng), 시간, 텍스트창 초기화
        document.getElementById('input').value = "";
        document.getElementById('appt').value ="";
        document.getElementById('alarm').value="";
        dateString = "";
    }
});


window.onload = function(){

    //로컬스토리지에 저장된 값이 없어도 달력출력
    calendar.render();


// ---------------------재부팅시 캘린더 다시생성 -----------------

    //로컬스토리지값 받아옴.
    var storageValue = localStorage.getItem("scheduleList");

    //역직렬화 하여 infoList에 저장
    if(storageValue != null){
        
        infoList = JSON.parse(storageValue);
        
    };
        
    console.log(localStorage.getItem("scheduleList"));
    console.log(infoList);
    //캘린더에 이벤트(일정)을 다시 채운다.  
    for(var i = 0; i < infoList.length; i++){
        //달력내 추가할 일정의 형식 -> [시간] 일정
        var input = "[" + infoList[i].time + "] " + infoList[i].schedule; 

        calendar.addEvent({
             title: input, 
            start: infoList[i].date
        });
    }

    //갱신한 달력을 보여줌
    calendar.render();

    //onload시 자식웹창(iframe)에 체크박스를 생성하기위해 메시지를 보낸다.
    var iframeWeb = document.getElementById('childWeb').contentWindow;
    iframeWeb.postMessage("onload", "http://127.0.0.1:5500");

    var iframeWeb2 = document.getElementById('childWeb2').contentWindow;
    iframeWeb2.postMessage("onload", "http://127.0.0.1:5500");
        

}
    //-------------------------------------------------------------


//iframe에서 메세지 (로컬스토리지 갱신)을 받으면 실행
window.addEventListener('message', function(event){
    //자식주소에서 보낸 메세지가아니면 종료
    if(event.origin !== "http://127.0.0.1:5500") return;

    var receiveData = event.data; 

   
    localStorage.setItem("scheduleList", receiveData);

    console.log(localStorage.getItem('scheduleList'));
   
  
    infoList = JSON.parse(receiveData);

    //캘린더에 이벤트를 모두 지운다.
    calendar.removeAllEvents();

    //캘린더에 이벤트를 다시 채운다.
    for(var i = 0; i < infoList.length; i++){
        var input = "[" + infoList[i].time + "] " + infoList[i].schedule; 
        calendar.addEvent({
            title: input,
            start: infoList[i].date
        });
    }
    //변경된 값을 보여준다.
    calendar.render();

});

//현재 일정에 가까운 순으로 <<정렬>>하기 위한 함수. 
//infoList를 날짜 (년-> 월-> 일) -> 시간(시 -> 분)순으로 가까운날짜로 정렬한다.
//이렇게 함으로 로컬스토리지 그리고 할일목록을 보여주는 자식웹에 순서대로 저장

function sortInfoList(){
   
        // infoList.sort((a, b) => {
        //     if (a.separateByYear() != b.separateByYear())
        //         return a.separateByYear() - b.separateByYear();

        //     if (a.separateByMonth() != b.separateByMonth())
        //         return a.separateByMonth() - b.separateByMonth();

        //     if (a.separateByDay() != b.separateByDay())
        //         return a.separateByDay() - b.separateByDay();

        //     if (a.separateByHour() != b.separateByHour())
        //         return a.separateByHour() - b.separateByHour();

        //     if (a.separateMinute() != b.separateByMinute())
        //         return a.separateMinute() - b.separateMinute();

        // })
        //왜인지 모르겠지만 재부팅시 sort오류 발생 -> separateByYear not defined 오류..


        //localeCompare 함수는 문자열을 알파벳 순서대로 비교할 때 사용
        infoList.sort((a, b) => {
            if (a.date !== b.date) {
                return a.date.localeCompare(b.date);
            } else {
                return a.time.localeCompare(b.time);
            }
        });
        
}

//setInterval(함수, delay); -> delay 시간마다 함수실행
//1분마다 checkdate() 함수를 실행한다.
var dayAlert = setInterval(checkDate, 1000 * 10);

function checkDate(){

    if(infoList.length === 0) return;
    //infoList의 첫번째 날짜를 목표날짜로 잡는다.(정렬이 되어있기 때문에 첫번째 날짜가 가장 가까운 일정)
    //infoList[].time 은 HH:MM으로 저장되어있기때문에 초가없다 따라서 :00(초)을 추가함
    var scheduleDate = infoList[0].date + "T" + infoList[0].time + ":00";

    var targetDate = new Date(scheduleDate);

    var currentDate = new Date();

    //getTime() 함수를 통해서 데이터를 숫자형으로 바꾼다.
    if(currentDate.getTime() >= targetDate.getTime()){
        alert(infoList[0].schedule + "를 시작할 시간입니다.!!!");

        //setInterval함수를 종료  
          clearInterval(dayAlert);

        //infoList에서 제거되기 전 제거된 일정 관리창에 객체를 보내고 출력하도록한다.
        var removeData = infoList[0];
        var iframeWeb2 = document.getElementById('childWeb2').contentWindow; 
        iframeWeb2.postMessage(removeData, "http://127.0.0.1:5500");       

        //infoList에서 제거하고 로컬스토리지 갱신
        infoList.splice(0,1);

        
        localStorage.setItem("scheduleList", JSON.stringify(infoList));

        console.log(localStorage.getItem('scheduleList'));
   

        //캘린더의 일정도 다시생성
        calendar.removeAllEvents();

        for(var i = 0; i < infoList.length; i++){
            //달력내 추가할 일정의 형식 -> [시간] 일정
            var input = "[" + infoList[i].time + "] " + infoList[i].schedule; 

            calendar.addEvent({
                title: input,
                start: infoList[i].date
            });
        }
        
        //변경된 달력 보여줌.
        calendar.render();

        //변경된 로컬스토리지 값을 iframe에 전송
        var storageValue = localStorage.getItem('scheduleList');

         //regenerate메세지를 보내면 iframe에서 체크박스를 다시만든다.
         // 부모윈도우의 로컬스토리지 값이 변경되었기때문에 iframe의 localStorage도 변경
         var iframeWeb = document.getElementById('childWeb').contentWindow;
         iframeWeb.postMessage(storageValue, "http://127.0.0.1:5500");

    }
}

// //하루전날 alert를 보내기 위한 setInterval 저장변수
var scheduledAlarm = setInterval(checkAlarm, 1000 * 10);


//타겟 데이트가 가까운 날짜로 소트를 해서 리스트를 하나 만들고, for문을 통해서 가까운 날짜부터 setInterval을 해주고,clearINterval을 한다.
//일정마다 예약알람을 받는것도 있고 받지않는것도 있다 + 일정마다 예약 알람받는 일자가 다르다 예약알람을 받는 일자에 해당 알람이 울리게한다. 
//따라서 예약알람 받는 일정을 찾아서 알람을 한번 울리고 다시울리지 않도록한다.
function checkAlarm() {
    if(infoList.length === 0) return;

    for(var i = 0 ; i < infoList.length; i++){
            if(infoList[i].alarm === undefined){
                var alarm = parseInt(0);
            } else{
                var alarm = parseInt(infoList[i].alarm);
            }
            //원래날짜 저장
            var originalDate = new Date(infoList[i].date);
            originalDate.setDate(originalDate.getDate() - alarm); // 날짜를 예약알람날짜로 변경

            var year = originalDate.getFullYear();
            var month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // 한 자릿수 월을 두 자릿수로 변환 (예: 9 -> 09)
            var day = originalDate.getDate().toString().padStart(2, '0'); // 한 자릿수 일을 두 자릿수로 변환 (예: 2 -> 02)
            
            var newDate = `${year}-${month}-${day}`;
        
            var changedDate = newDate + "T" + infoList[i].time + ":00";

            var targetDate = new Date(changedDate);
            
            infoList[i].targetDate = targetDate;
    }

    var targetDateList = infoList.sort((a, b) => {  
        if(a.targetDate != b.targetDate){
            var dateA = new Date(a.targetDate);
            var dateB = new Date(b.targetDate);
            return dateA - dateB;
        }
    });

    var target = setInterval(() => {
        for(var i = 0; i < targetDateList.length; i++){
            if(targetDateList[i].alarm === undefined) continue;

            var targetDate = targetDateList[i].targetDate;
            var currentDate = new Date();
            var scheduleDate = new Date(targetDateList[i].date + "T" + targetDateList[i].time + ":00");
            
                    
            if(currentDate.getTime() >= targetDate.getTime() && currentDate.getTime() < scheduleDate.getTime()){
                var differenceDate = scheduleDate.getTime() - currentDate.getTime(); // 예정된 일정 시간 - 현재시간을 해준다.
                var differenceHour =  differenceDate / (1000 * 60 * 60); //  위에 나온값을 가지고 1시간으로 나눈다.
            
                var dfHour = parseFloat(differenceHour.toFixed(1)); //소수점 1자리까지만 저장.
            
                alert(targetDateList[i].schedule + "을(를) 시작하기" + dfHour + "시간 전 입니다.");
            
                // infoList[i].alarm을 undefined로 다시 설정함으로써 알람이 한번 울린후 다시 안울리도록 함.
                infoList[i].alarm = undefined;
                        
                clearInterval(target);
                    
             }
        }
    }, 1000 * 10);

}

// // (수정 요망) 객체를 추가한다. 사용자에게 알람을 몇일뒤에 띄울건지 입력받고
// // 그값을 객체에 저장해서 dateofThedayBefore()함수에서 그값을 받아 일정전에 알람을 보내준다
// function checkAlarm() {
//     if(infoList.length === 0) return;

    
//     for(var i = 0; i < infoList.length; i++){
//         if(infoList[i].alarm === undefined) continue;

//         var alarm = parseInt(infoList[i].alarm);
//         //원래날짜 저장
//         var originalDate = new Date(infoList[i].date);
//         originalDate.setDate(originalDate.getDate() - alarm); // 날짜를 예약알람날짜로 변경

//         var year = originalDate.getFullYear();
//         var month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // 한 자릿수 월을 두 자릿수로 변환 (예: 9 -> 09)
//         var day = originalDate.getDate().toString().padStart(2, '0'); // 한 자릿수 일을 두 자릿수로 변환 (예: 2 -> 02)
        
//         var newDate = `${year}-${month}-${day}`;
      
//         var changedDate = newDate + "T" + infoList[i].time + ":00";

//         var targetDate = new Date(changedDate);
//         var currentDate = new Date();
//         var scheduleDate = new Date(infoList[i].date + "T" + infoList[i].time + ":00");

        
//         if(currentDate.getTime() >= targetDate.getTime() && currentDate.getTime() < scheduleDate.getTime()){
//             var differenceDate = scheduleDate.getTime() - currentDate.getTime(); // 예정된 일정 시간 - 현재시간을 해준다.
//             var differenceHour =  differenceDate / (1000 * 60 * 60); //  위에 나온값을 가지고 1시간으로 나눈다.

//             var dfHour = parseFloat(differenceHour.toFixed(1)); //소수점 1자리까지만 저장.

//             alert(infoList[i].schedule + "을(를) 시작하기" + dfHour + "시간 전 입니다.");

//             // infoList[i].alarm을 undefined로 다시 설정함으로써 알람이 한번 울린후 다시 안울리도록 함.
//             infoList[i].alarm = undefined;
            
//             infoList[i].checkAlert = true;
//             // clearInterval을 할경우 입력받은 알람이 안울릴수 있기 때문에 주석처리.
// //            clearInterval(theDayBeforeAlert);
//         }
//     }
// }

