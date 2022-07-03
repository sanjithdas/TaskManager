
 
/* 
Task Manager class
Methods:
  1. Create Task - addTask method
  2. Display tasks - getAllTasks
  3. Get task with status - getTasksWithStatus
  7. deleteTask
*/

class TaskManager{
  // constructor intialize the current id as 0 , and the tasks array as empty
  constructor(currentId = 0) {
    this.currentId = currentId;
    this.tasks = JSON.parse(localStorage.getItem('tasks_data')) || [];
    if (localStorage.getItem('tasks_data')){
      JSON.parse(localStorage.getItem('tasks_data')).forEach(element => {
        this.currentId = element.id; // 2
      });
    }
    
};

// add the newly created task object into the task array.
addTask(name, description, assignedTo, dueDate, status) {
  // validate all the inputs - isValidatedSuccessfully = true if successfull 
  let isValidatedSuccessfully = validateTaskForm(name, description, assignedTo, dueDate, status);
    // push into the tasks array if the input is validated successfully.  
     if (isValidatedSuccessfully) { 
      if (localStorage.getItem('tasks_data')){
        JSON.parse(localStorage.getItem('tasks_data')).forEach(element => {
          this.currentId = element.id;
        });
      }
      this.currentId++;  // 3
        const taskAdd = {
        id: this.currentId, // 3
        name: name,
        description: description,
        assignedTo: assignedTo,
        dueDate: dueDate,
        status: status,
    };
    // push to array 
      this.tasks.push(taskAdd);
    // storing data to local storage.  
      localStorage.setItem('tasks_data',JSON.stringify(this.tasks));
    // modal closing using jQuery.
     // $('#crate-new-task').modal('hide');
     // automatically reload the browser 
      location.reload();
    }
 }
 /* return all the tasks  from the tasks array 
  show current date
  display both information on the landing page when the page is loaded.
 */
 getAllTasks(){
  showCurrentTime();
  createTaskHTML();
  return this.tasks;
 }

 editTask(taskId){
    let index = this.tasks.findIndex(task=> task.id === taskId);
    console.log(index);
    document.getElementById('edit_name').value=this.tasks[index].name;
    document.getElementById('edit_description').value=this.tasks[index].description;
    document.getElementById('edit_assign_to').value=this.tasks[index].assignedTo;
    document.getElementById('edit_duedate').value=this.tasks[index].dueDate;
   // console.log(document.getElementById('edit_status'));
   // document.getElementById('edit_status').val(this.tasks[index].status);
   
   // this.tasks[index].status = document.getElementById('edit_duedate').value;
 
   document.getElementById("index").value=index;
   console.log(this.tasks);
 }

 updateTask(index,status){
  //let index = this.tasks.findIndex(task=> task.id === taskId);
    console.log(index);
    this.tasks[index].name = document.getElementById('edit_name').value;
    this.tasks[index].description = document.getElementById('edit_description').value;
    this.tasks[index].assignedTo = document.getElementById('edit_assign_to').value ;
    this.tasks[index].dueDate = document.getElementById('edit_duedate').value;
    if (status)
      this.tasks[index].status = status;
    localStorage.setItem('tasks_data',JSON.stringify(this.tasks));
    //createTaskHTML();
    location.reload();
 }

 // delete task from the array based on id and update the localStorage
 deleteTask(taskId){
   // alert the user to confirm deletion
  let isDelete = confirm('Are you sure you want to delete this record?')
  console.log('delete task',isDelete);
  if (isDelete){
   let index = this.tasks.findIndex(task=> task.id === taskId) // taskiD= 2
   console.log(index);
   // if that task found index will not be -1 , else the index will be -1
   if (index > -1){
     // remove that element from the array
    this.tasks.splice(index,1);
   }
   console.log(this.tasks);
   // update local storage
   localStorage.setItem('tasks_data',JSON.stringify(this.tasks));
   location.reload();
  }
 }

 updateStatus(taskId){
    let index = this.tasks.findIndex(task=> task.id === taskId)
    this.tasks[index].status = "DONE";
   localStorage.setItem('tasks_data',JSON.stringify(this.tasks));  
   location.reload();
 }

}

const task = new TaskManager();





