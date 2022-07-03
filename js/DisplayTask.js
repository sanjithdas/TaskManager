
// function to display the task on DOM.
// parent node
let taskList = document.getElementById("task_lists") ;
const createTaskHTML = () =>{
  
  // getting from local storage
  let tasksFromLocalStorage;
  if (localStorage.getItem('tasks_data')){
    tasksFromLocalStorage = localStorage.getItem('tasks_data') ;
  }
  // converting to object from string
  if (tasksFromLocalStorage){
  let tasks = JSON.parse(tasksFromLocalStorage);
   
   let strHTML = '';
   // looping all the tasks fetch from the localStorage. 
   tasks.forEach((task,index)=>{
    
     // task status display
     let taskStatus = "";
      // task status display
     let taskStatusImage = "";
     let taskBgColor = "";
     let dueDate = "Due Date:";
     let checkStatus=""
     let btnEdit = ""
     
    // convert the due date into human readable format.
    let taskDueDate = new Date(task.dueDate);
    let dateFormat = `${taskDueDate.getDate()}/${taskDueDate.getMonth() + 1}/${taskDueDate.getFullYear()}`; 

     if (index % 2 != 0) taskBgColor ="";
     else
      taskBgColor = "bg-info";
    if (task.status==="in-progress"){
      taskStatusImage ="progress.png"
      taskStatus = "In Progress"
    }
    else if (task.status==="REVIEW"){
      taskStatusImage ="review.png"
      taskStatus = "Review"
    }
    else if (task.status==="DONE"){
      taskStatusImage ="done.png";
      taskStatus = "Done";
      dateFormat = "";
      dueDate = ""
      checkStatus = "checked disabled";
      btnEdit = "disabled"
    }
    else if (task.status==="todo"){
      taskStatusImage ="pending.png";
      taskStatus = "To Do"
    }
    
    strHTML += 
     `
    <div class="row item-container-1 ${taskBgColor}">
     <div class="col">
       <input type="checkbox" name="id" value="${task.id}" class="bg-info first " ${checkStatus} onclick="task.updateStatus(${task.id})">
       <span class="task-name">${task.name}</span>
     </div>
     <div class="col right">
         <div class="item"><button class="btn btn-info mr-2" data-toggle="collapse" href="#description-panel-${index}" role="button" aria-expanded="false" title="View your task" aria-controls="description-panel-${index}">View</button></div>

         
         <div class="item"><button type="button" class="btn btn-info mr-2" data-toggle="modal" data-target=".edit-task-form" title="Edit your task" data-id="${task.id}" onclick="task.editTask(${task.id})" ${btnEdit}>Edit</button></div>

         <div class="item"><button class="btn btn-info mr-2" data-toggle="tooltip" data-placement="top" title="Delete Task" onclick="task.deleteTask(${task.id})">Delete</button></div>
          
         <div class="item"><img src="/images/${taskStatusImage}" alt="${taskStatus}" title="${taskStatus}" width="60px"></div>
         <div class="item font-weight-bold">${dueDate} ${dateFormat}  <div class="font-weight-bold h3"><sub>${taskStatus}</sub></div>  </div>
        
     </div>
     <div class="collapse" id="description-panel-${index}">
       <div class="card" style="width: 18rem;">
         <img class="card-img-top" src="/images/${taskStatusImage}" alt="Card image cap">
         <div class="card-body">
           <h5 class="card-title">${task.name}</h5>
           <p class="card-text font-weight-bold">
            Assigned To : ${task.assignedTo} <br>
            Description : ${task.description}<br>
            ${dueDate} ${dateFormat}<br>
            Status: ${task.status}<br>
            </p>
         </div>
       </div>
     </div>
    </div>
     `
   });
   render(strHTML);
  }
  else{
    strHTML = '`<div class="mt-5 text-center"><b>No task found</b></div>`';
    render(strHTML);
  }
}

// render metod to render the tasks on the landing page

const render = (strHTML) =>{
  taskList.innerHTML = strHTML;
}
