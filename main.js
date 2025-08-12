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
let taskList = []

addButton.addEventListener("click", addTask);

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
    let resultHTML = ""
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].isComplate == true){
            resultHTML += `<div class="task">
                            <div class="task-done">${taskList[i].taskContent}</div>
                            <div>
                                <button onclick="toggleComplate('${taskList[i].id}')">Check</button>
                                <button onClick="deleteTask('${taskList[i].id}')">Delete</button>
                            </div>
                        </div>`
        }else {
            resultHTML += `<div class="task">
                            <div>${taskList[i].taskContent}</div>
                            <div>
                                <button onclick="toggleComplate('${taskList[i].id}')">Check</button>
                                <button onClick="deleteTask('${taskList[i].id}')">Delete</button>
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
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render()
}