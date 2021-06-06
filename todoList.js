// SELECTORS
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')


//EVENT LISTENERES
document.addEventListener('DOMContentLoaded', getTodo)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)



//FUNCTIONS
function addTodo(event){
    //The preventDefault() method cancels the event if it is cancelable,
    //  meaning that the default action that belongs to the event will not occur.
    //prevent form from submitting
    event.preventDefault()
    
    // Todo DIV
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    //Create LI
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value)
    // CHECK MARK BUTTON
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)
    // CHECK TRASH BUTTON
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)
    //APPEND TO LIST    
    todoList.appendChild(todoDiv)
    //Clear TODO INPUT VALUE
    todoInput.value = ''
}


function deleteCheck(e){
    const item = e.target
    //DELETE TODO
    if (item.classList[0] === 'trash-btn' ) {
        const todo = item.parentElement
        //ANIMATION
        todo.classList.add("fall")
        removeLocalTodos(todo)
        //ეს ფუნქცია გაეშვება როდესაც ანიმაცია მორჩება მუშაობას!!!
        todo.addEventListener('transitionend', function(){
            todo.remove()
        })
        
    }

    //CHECK MARK
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

function filterTodo(e) {
    const todos = todoList.children
    for(todo of todos) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
      }
      
    };
  }


function saveLocalTodos(todo){
  // ჯერ ვამოწმებთ რამე ხომ არ არის local storage ში ერთი და იგივე ინფრო რო არ მოხდეს
  
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = []
  }else{
    //parrsings vuketebt gadagvyavs arrayshi 
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
  
}

function getTodo(){
  //cheking local storage
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = []
  }else{
    //parrsings vuketebt gadagvyavs arrayshi 
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  for(todo of todos){
    // Todo DIV
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    //Create LI
    const newTodo = document.createElement('li')
    newTodo.innerText = todo
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
    // CHECK MARK BUTTON
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)
    // CHECK TRASH BUTTON
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)
    //APPEND TO LIST    
    todoList.appendChild(todoDiv)
  }

}


function removeLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = []
  }else{
    //parrsings vuketebt gadagvyavs arrayshi 
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  // div სი ვკითხულობთ ტექსტს და სპლაი მეთოდში 
  // მისი მეშვეობით ვპოულობთ ინდექსაციას და ვშლით 1 მთლიან ტექსტს
  //JSON  vabrunebt array strshi
  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex), 1)
  localStorage.setItem('todos', JSON.stringify(todos))
}