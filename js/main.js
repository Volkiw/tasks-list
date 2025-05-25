'use strict';

// CONSTANTES
const inputTarea = document.querySelector(".js_input-tarea");
const btnTarea = document.querySelector(".js_button-tarea");
const listaTareas = document.querySelector(".js_list");
let newId = 1;
let tasks = [
  //{ name: "Comprar pilas", completed: false, id: 2 },
  ];
const btnBorrarLista = document.querySelector(".js_borrar-lista");

// verificar si hay local storage:
if (localStorage.getItem("tasks")!== null) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}; 

// FUNCIONES

function showBtnBorrarLista(){
  if (tasks.length !== 0){
   btnBorrarLista.classList.remove("hidden");
  } else {
    btnBorrarLista.classList.add("hidden");
  }
// elimino la task señalada definitivamente
}

function deleteTask(ev){
  let binId = parseInt(ev.currentTarget.id);
  console.log(binId);
  const i = tasks.findIndex(task => task.id === binId); // dime en qué posición está?
  tasks.splice(i, 1);
  // localStorage.removeItem(tasks[i]);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  console.log(tasks);
  paintArrayTasks();
};

// forEach para el deleteTask
function initDeleteButtons(){
  let binArray = document.querySelectorAll(".js_delete");
  binArray.forEach((bin) => {
    bin.addEventListener("click", deleteTask);  
  });
};

function borrarLista(){
    localStorage.removeItem("tasks");
};

// pinta las tareas en la lista
function paintArrayTasks(){
  listaTareas.innerHTML = " "; // borro la lista para empezar de cero
  for (let task of tasks){
    if (task.completed === true){
      listaTareas.innerHTML += `<li><button class="js_delete delete" id="${task.id}">🗑️ </button> <label class="tachado"
      > <input type="checkbox" checked id="task-${task.id}" value="value-check-${task.id}" /> ${task.name}</label
    ></li>`;
    } else {
      listaTareas.innerHTML += `<li><button class="js_delete delete" id="${task.id}">🗑️ </button> <label
      > <input type="checkbox" id="task-${task.id}" value="value-check-${task.id}" /> ${task.name}</label
    ></li>`;
    }
  }
  initDeleteButtons(); 
  showBtnBorrarLista();
};

// añado el valor completed o no al objeto
function completeTask(ev){
  const taskId = ev.target.id;
  for (let task of tasks){  
    if (taskId === "task-" + task.id ){
      if (task.completed === false) {
        task.completed = true;
      } else {
        task.completed = false;
      }
    }
  }
  paintArrayTasks();
};

 // crear nuevos objetos en el array con lo que se añade en el input
 function handleClickTask(ev) {
  ev.preventDefault();
if (inputTarea.value === ""){
    inputTarea.placeholder = "Completa este campo con la tarea";
} else {
  let lastId = tasks.at(-1);

  if (tasks[0] !== undefined) {
    newId = parseInt(lastId.id) + 1;
  } else {
    newId = 1;
  }

  tasks.push(
    { name: inputTarea.value,
      completed: false, 
      id: newId,
    }
  );

  paintArrayTasks(); // la pinto de nuevo con el nuevo array 
  inputTarea.value = null;
  //Almacenar informacion en el local storage (falta pintarlo)
  localStorage.setItem("tasks", JSON.stringify(tasks));}
};


paintArrayTasks();


// eventos
btnTarea.addEventListener("click", handleClickTask);
listaTareas.addEventListener("click", completeTask);
btnBorrarLista.addEventListener("click", borrarLista);


