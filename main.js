// 유저가 값을 입력한다.
// + 버튼을 클릭 => 할 일이 추가.
// 유저가 delete 클릭 => 할 일 삭제.
// check 버튼 클릭 => 할 일  밑줄 생성
// 1. check 버튼을 클릭하는 순간 true -> false
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false 이면 안 끝난걸로 간주하고 그대로

// 진행 중 끝남 탭을 누르면, 언더비가 이동.
// 끝남 탭은 끝난 아이템만, 진행 중 탭은 진행 중인 아이템 만.
// 전체 탭을 누르면 전체 아이템으로 돌아옴.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll('.task-tabs div');
let underLine = document.getElementById("under-line");

let taskList = [];
let mode= 'all';
let filterList = []

addButton.addEventListener("click", addTask);

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function() {
        filter(event)
    });
}

function addTask() {
    // let taskContent = taskInput.value;
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplate: false
    }
    taskList.push(task);
    console.log(taskList);
    render()
}

function render(){
    // 1. 내가 선택한 탭에 따라
    let list = []
    if(mode === 'all'){
        list = taskList
    }else if(mode === 'ongoing' || 'done'){
        list = filterList
    }

    let resultHTML = ""
    for(let i = 0; i < list.length; i++){
        if(list[i].isComplate == true){
            resultHTML += `<div class="task">
                            <div class="task-done">${list[i].taskContent}</div>
                            <div>
                                <button onclick="toggleComplate('${list[i].id}')">Check</button>
                                <button onClick="deleteTask('${list[i].id}')">Delete</button>
                            </div>
                        </div>`
        }else {
            resultHTML += `<div class="task">
                            <div>${list[i].taskContent}</div>
                            <div>
                                <button onclick="toggleComplate('${list[i].id}')">Check</button>
                                <button onClick="deleteTask('${list[i].id}')">Delete</button>
                            </div>
                        </div>`;
        }
    }

    document.getElementById('taks-board').innerHTML = resultHTML
}

function toggleComplate(id) {
    for(let i = 0; i < taskList.length;i++){
        if(taskList[i].id == id) {
            taskList[i].isComplate = !taskList[i].isComplate;
            break;
        }
    }
    render()
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id) {
    debugger;
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    filter()
}

function filter(event){
    if(event){
        mode = event.target.id;
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top = event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
    }

    filterList = [];
    if(mode === 'all'){
        // 전체리스트
        render()
    }else if(mode === 'ongoing'){
        // 진행중인 아이템
        // task.isComplate=false
        for(let i=0; i<taskList.length;i++){
            if(taskList[i].isComplate === false){
                filterList.push(taskList[i])
            }
        }
        render();
    }else if(mode === 'done'){
        // 끝나는 케이스
        // task.isComplate=true
        for(let i= 0; i<taskList.length;i++){
            if(taskList[i].isComplate === true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
}