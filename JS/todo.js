const todoForm = document.querySelector(".js-todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector(".js-todoList");
const hideToDoBtn = document.querySelector("#hideToDoBtn");


const TODOS_LS = "ToDos";
var LIST = [];


function handleSubmit(){
    event.preventDefault();
    const currentValue = todoInput.value;
    if (currentValue !== ""){
        paintTodo(currentValue);
        todoInput.value = "";
    
    }

}

function saveTodos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(LIST));
}

function deleteTodo(event){
    const deleteThis = event.target.parentNode;
    todoList.removeChild(deleteThis);
    const newTodos = LIST.filter(function(ToDo){
        return ToDo.id !== parseInt(deleteThis.id);
    });

    LIST = newTodos
    saveTodos();

}

function createLineThrough(event){
    if (event.target.classList.contains("lineThrough")){
        event.target.classList.remove("lineThrough");
    }
    else{
        event.target.classList.add("lineThrough");
    }
}


function paintTodo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = LIST.length;
    delBtn.id = "delBtn";
    delBtn.innerText = "delete";
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = text;
    span.className = "todoSpan";
    span.style.cursor = "pointer";

    span.addEventListener("click", createLineThrough);

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    todoList.append(li);

    const TODOS_OBJ = {
        text: text,
        id: newId
    }

    LIST.push(TODOS_OBJ);
    saveTodos();

    todoList.classList.remove("hide");
}


function loadTodos(){
    const loaded = localStorage.getItem(TODOS_LS);
    if (loaded !== null){
        const parsed = JSON.parse(loaded);
        for (ToDo of parsed){
            paintTodo(ToDo.text)
        }
    }
    else{
        saveTodos();

    }
}

function handleHideTodo(){
    const todoSaved = localStorage.getItem(TODOS_LS);
    const parseSaved = JSON.parse(todoSaved);
    if(parseSaved.length > 0){
        todoList.classList.toggle("hide");
    }
}

function hideToDo(){

    hideToDoBtn.classList.add("rotate");
    setTimeout(function(){
        hideToDoBtn.classList.remove("rotate");
    }, 1300)
    handleHideTodo();

    

}

function hideTodosAfterRefresh(){
    const todoSaved = localStorage.getItem(TODOS_LS);
    const parseSaved = JSON.parse(todoSaved);
    if (parseSaved.length !== 0){
    todoList.classList.add("hide");
    }
}





function init(){
    loadTodos();
    todoForm.addEventListener("submit", handleSubmit);
    hideTodosAfterRefresh();
}

init();