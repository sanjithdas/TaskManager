
// function to display the task on DOM.
// parent node
let taskList = document.getElementById("task_lists") ;
let btnSort = document.getElementById("btn_start")
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
   // all the button click event implemented here 

   tasks.forEach((task,index)=>{
    
     // task status display
     let taskStatus = "";
      // task status image display
     let taskStatusImage = "";
     let taskBgColor = "";
     let dueDate = "Due Date:";
     let checkStatus=""
     let btnEdit = ""
     
    // convert the due date into human readable format.
    let taskDueDate = new Date(task.dueDate);
    let dateFormat = `${taskDueDate.getDate()}/${taskDueDate.getMonth() + 1}/${taskDueDate.getFullYear()}`; 

    // alternative color for different dask division (checking even/odd)
    
     if (index % 2 != 0) taskBgColor ="";
     else
      taskBgColor = "bg-info";
      // if status == in-progress
    if (task.status==="in-progress"){
      taskStatusImage ="progress.png"
      taskStatus = "In Progress"
    } 
    // if status == review
    else if (task.status==="REVIEW"){
      taskStatusImage ="review.png"
      taskStatus = "Review"
    }
     // if status == done
    else if (task.status==="DONE"){
      taskStatusImage ="done.png";
      taskStatus = "Done";
      dateFormat = "";
      dueDate = ""
      checkStatus = "checked disabled";
      btnEdit = "disabled"
    }
     // if status == todo
    else if (task.status==="todo"){
      taskStatusImage ="pending.png";
      taskStatus = "To Do"
    }
    
    // DOM element creat
    strHTML += 
     `
    <div class="row item-container-1 ${taskBgColor}">
     <div class="col">
       <input type="checkbox" name="id" value="${task.id}" class="bg-info first " ${checkStatus} onclick="task.updateStatus(${task.id})">
       <div class="task-name" nowrap>${task.name}</div>
     </div>
     <div class="col right">
         <div class="item"><button class="btn btn-info mr-2" data-toggle="collapse" href="#description-panel-${index}" role="button" aria-expanded="false" title="View your task" aria-controls="description-panel-${index}">View</button></div>
         
         <div class="item"><button type="button" class="btn btn-info mr-2" data-toggle="modal" data-target=".edit-task-form" title="Edit your task" data-id="${task.id}" onclick="task.editTask(${task.id})" ${btnEdit}>Edit</button></div>

         <div class="item"><button class="btn btn-info mr-2" data-toggle="tooltip" data-placement="top" title="Delete Task" onclick="task.deleteTask(${task.id})">Delete</button></div>
          
         <div class="item"><img src="./images/${taskStatusImage}" alt="${taskStatus}" title="${taskStatus}" width="60px"></div>
         <div class="item font-weight-bold">${dueDate} ${dateFormat}  <div class="font-weight-bold h3"><sub>${taskStatus}</sub></div>  </div>
        
     </div>
     <div class="collapse" id="description-panel-${index}">
       <div class="card" style="width: 18rem;">
         <img class="card-img-top" src="./images/${taskStatusImage}" alt="Card image cap">
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

// display task status in the second column

const showTaskStatus =(tasks) =>{

  let elemCompletedTask = document.getElementById("completed_task");
  let elemPendingTask = document.getElementById("pending_task");
  let elemReviewTask  = document.getElementById("review_task");
  let elemProgressTask  = document.getElementById("progress_task");

  let statusCompleted = ""
  let statusPenidng = ""
  let statusProgress = ""
  let statusReview = ""
  let dueDate = "Due Date:";

  

  // iterating through the task array to check the status

  tasks.forEach((task,index)=>{
    if (task.status=="DONE"){
      statusCompleted += `
      <div class="card mb-1 bg-success" style="width: 18rem;">
     
      <div class="card-body">
        <h3 class="card-title font-weight-bold bg-light rounded">${task.name}</h3>
        <p class="card-text h-6">
         Assigned To : ${task.assignedTo} <br>
         Description : ${task.description}<br>
        
         </p>
      </div>
    </div>
    `
    }
        
    if (task.status=="todo"){
      statusPenidng += `
      <div class="card mb-1  bg-danger" style="width: 18rem;">
     
      <div class="card-body">
        <h3 class="card-title font-weight-bold bg-light rounded">${task.name}</h3>
        <p class="card-text font-weight-bold">
         Assigned To : ${task.assignedTo} <br>
         Description : ${task.description}<br>
         ${dueDate} : ${showDueDate(task.dueDate)}
        
         </p>
      </div>
    </div>
    `
    }

    if (task.status=="REVIEW"){
      statusReview += `
      <div class="card mb-1 ml-0 bg-warning" style="width: 18rem;">
     
      <div class="card-body">
        <h3 class="card-title bg-light font-weight-bold rounded">${task.name}</h3>
        <p class="card-text font-weight-bold">
         Assigned To : ${task.assignedTo} <br>
         Description : ${task.description}<br>
         ${dueDate} : ${showDueDate(task.dueDate)}
         </p>
      </div>
    </div>
    `
    }

    if (task.status=="in-progress"){
      statusProgress += `
      <div class="card mb-1" style="width: 18rem;background-color:#17a2b8">
     
      <div class="card-body">
        <h3 class="card-title bg-light font-weight-bold rounded">${task.name}</h3>
        <p class="card-text font-weight-bold">
         Assigned To : ${task.assignedTo} <br>
         Description : ${task.description}<br>
         ${dueDate} : ${showDueDate(task.dueDate)}
        </p>
      </div>
    </div>
    `
    }



  })
 
  elemCompletedTask.innerHTML = statusCompleted;
  elemPendingTask.innerHTML = statusPenidng;
  elemReviewTask.innerHTML = statusReview;
  elemProgressTask.innerHTML = statusProgress;

  if (!statusProgress){
    elemProgressTask.innerHTML = `<div style="background-color:#17a2b8; width:300px">No task found</div>`;
  }
  if (!statusPenidng){
    elemPendingTask.innerHTML = `<div class="bg-danger" style="width:300px">No task found</div>`;
  }
  if (!statusReview){
    elemReviewTask.innerHTML = `<div class="bg-warning" style="width:300px">No task found</div>`;
  }
  if (!statusCompleted){
    elemCompletedTask.innerHTML = `<div class="bg-success" style="width:300px">No task found</div>`;
  }
  
}


// convert to human readable format..
const showDueDate = (taskDate) =>{
  let taskDueDate = new Date(taskDate);
  let dateFormat = `${taskDueDate.getDate()}/${taskDueDate.getMonth() + 1}/${taskDueDate.getFullYear()}`; 
  return dateFormat
}

// sort button listener
btnSort.addEventListener('click',()=>{
  task.sortTask();
  
})

function sortByDate(a, b) {
  if (a.dueDate > b.dueDate) {
      return 1;
  }
  if (a.dueDate < b.dueDate) {
      return -1;
  }
  return 0;
}

 // sort task based on due date.
function sortTasks(sortedArray)
{
  let arrSort =  sortedArray.sort(sortByDate);
  localStorage.setItem('tasks_data',JSON.stringify(arrSort));
  location.reload();
}


