//로컬스토리지에 있는 객체를 담을 배열
var infoList = [];

//부모윈도우로부터 메세지를 받을경우 실행
window.addEventListener('message', function(event) {
    //만약 메세지가 부모웹에서 온게 아니라면 함수종료
    if(event.origin !== "http://127.0.0.1:5500")
        return;
    
    //event.date가 제이슨일경우 실행
    if(isValidJSON(event.data)) {
        //받은 데이터를 로컬스토리지에 저장
        var receiveData = event.data;
        localStorage.setItem('scheduleList', receiveData);
        console.log(localStorage.getItem('scheduleList'));
   

        //메세지로 해당 데이터를 받으면 iframe에 체크박스로 할일리스트 출력
        changeCheckbox();
    }

    //부모웹 재부팅시 실행
    if(event.data === 'onload') {
        changeCheckbox();
    }
});


//제이슨 파일 인지 확인하는 함수
function isValidJSON(str) {
    try {
        //제이슨 파싱이 되면 true반환
        JSON.parse(str);
        return true;
    } catch (e) {
        //안되면 false반환
        return false;
    }
}


//체크박스를 갱신하는 함수.
function changeCheckbox(){
    var value = localStorage.getItem('scheduleList');

    if(value != null) {
        var parseData = JSON.parse(value);

        console.log(localStorage.getItem('scheduleList'));
        //체크박스를 추가할 위치를 불러온다.(div)
        var checkboxList = document.getElementById('checkboxList');

        //postmessage를 받을때마다 div창 초기화 (초기화하고 받은 값으로 다시 체크박스와 라벨을 만들고 출력) 
        checkboxList.innerHTML = "";

        //infoList는 부모로부터 값을 받을때 마다 갱신되어야 한다 .따라서 배열 초기화
        infoList = [];

        infoList = parseData;

        //파싱된 데이터를 가지로 체크박스를 만든다.
        for(var i = 0; i < parseData.length; i++){

            
            //날짜값과 스케줄값을 각각 받아온다.
            var date = infoList[i].date;
            var schedule = infoList[i].schedule;
            var time = infoList[i].time;

             //라벨에 추가할 날짜값과 스케줄값을 문자열로 초기화한다.
             var input = "[날짜 : " + date +  "] [시간 : " + time + "]  [일정 : " + schedule + "]";

            //체크박스를 만든다.
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = "box" + i//체크 박스 고유 식별 이름(for를 통해 연결하기위해)
            checkbox.value = "check" // 체크할경우 check가 서버에 전송

            //라벨 생성
            var label = document.createElement("label");
            label.htmlFor = "box" + i; //텍스트 날짜를 가진 체크박스와 for를 통해 연결
                                       //label의 for요소를 통해 checkbox의 날짜와 연결
            label.appendChild(document.createTextNode(input));

            //체크박스를 추가할 위치 ("list")에 만들어놓은 체크박스와 라벨을 생성
            checkboxList.appendChild(checkbox);
            checkboxList.appendChild(label);
            checkboxList.appendChild(document.createElement("br"));

         }
    }
}

function removeList(){
    //체크박스들을 querySelectorAll()함수를 사용해서 배열 형식으로 만든다.
    let list = document.querySelectorAll('input[type="checkbox"]');

    //해당 체크박스들을 순회한다.
    //자바스크립트 배열 특성상 splice()함수를 써서 특정배열을 삭제하면
    //스스로 빈값을 정리하기 때문에 뒤에서 부터 for문을 돈다.
    for(var i = list.length - 1; i >= 0; i--){
        
        //체크박스에 체크된 경우, 해당 채크박스의 라벨과 체크박스를 지운다.
        //list는 checkbox -> label -> br 순으로 저장되어있다.
        if(list[i].checked){
            list[i].nextElementSibling.remove(); //checkbox 의 다음요소를 지운다. 즉 label 제거
            list[i].nextElementSibling.remove(); //checkbox의 다음요소를 지운다. 즉, br제거
            list[i].remove(); // 마지막으로 checkbox를 제거

            //체크박스의 배열번호와 infoList의 순서가 같기때문에 체크박스가 없어지면
            //해당 체크박스 순서와 일치하는 infoList를 지운다 
            //splice()함수는 매개변수로 2가지를 받는다 (없앨값위치, 없앨갯수); 
            //splice()함수를통해서 i번째위치의 값을 1개 지운다.
            infoList.splice(i,1);

        }

         
            //로컬스토리지 갱신
            localStorage.setItem('scheduleList', JSON.stringify(infoList));
            console.log(localStorage.getItem('scheduleList'));
   

    }

    //갱신된 값을 부모웹페이지에 전송
    var storageValue = localStorage.getItem("scheduleList");
    window.parent.postMessage(storageValue,"http://127.0.0.1:5500");
}

