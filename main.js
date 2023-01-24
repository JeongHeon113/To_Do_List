// 유저는 할일을 추가할 수 있다.
// 각 할일에 삭제와 체크버튼이 있다.
// 삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
// 체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이간다.
// 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다

let inputTask = document.getElementById("input_task");
let addButton = document.getElementById("add_button");
let taskList = [];
let tabs = document.querySelectorAll(".task_tabs div");
let mode = "all";
let filterList = [];
let underLine = document.getElementById("under_line")
addButton.addEventListener("click", addTask);
inputTask.addEventListener("keyup",function(event){
  if(event.keyCode ===13){
    addTask(event);
  }
})
console.log(tabs)
tabs.forEach(menu=>menu.addEventListener("click",(e)=>menuIndicator(e)))

function menuIndicator(e){
  underLine.style.left = e.target.offsetLeft + "px";
  underLine.style.width = e.target.offsetWidth + "px";
  underLine.style.top = e.target.offsetTop + (e.target.offsetHeight -4) + "px"
}

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: inputTask.value,
    isComplete: false,
  };
  taskList.push(task);
  inputClear()
  render();
}
//task라는 객체를 만들고 taskList에 넣은 후 render 함수 호출

function render() {
  console.log("render실행 됨")
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `
            <div class="task">
                <div class="task-done">
                    ${list[i].taskContent}
                </div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Return</button>
                    <button onclick="taskDelete('${list[i].id}')">Delete </button>
                </div>
             </div>`;
    } else {
      resultHTML += `
        <div class="task">
            <div>
                ${list[i].taskContent}
            </div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="taskDelete('${list[i].id}')">Delete</button>
            </div>
         </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
  console.log("task:",taskList)
  console.log("filter:",filterList)
}
//mode가 all이면 taskList, 아니면 filterList를 가져옴
//그 후 완료된거면 task-done을 실행, 아니면 기본 div 실행

function toggleComplete(id) {
  console.log("toggleComplete실행 됨")
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
 filter();
 
}
//check버튼을 누르면 해당 아이디 완료속성을 반대로 바꾸고 render 함수 실행

function taskDelete(id) {
  console.log("taskDelete실행 됨")
  for (let i = 0; i <= taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter()
  // for (let i=0; i <=filterList.length; i++){
  //   if (filterList[i].id ==id){
  //       filterList.splice(i,1);
  //       break;
  //   }
  // }
  // render();
}
//

function filter(e) {
  console.log("filter 실행됨")

  if (e){
    mode = e.target.id;
  }
  filterList = [];
  if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}
function randomIDGenerate() {
  return Math.random().toString(36).substr(2, 16);
}
function inputClear(){
  inputTask.value="";
}