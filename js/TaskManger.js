
 
/* 
Task Manager class
Methods:
  1. Create Task - addTask method
  2. Display tasks - getAllTasks
  3. editTask 
  4. updateTask
  5. updateTask
  6. updateStatus
  7. deleteTask
*/

// class start here
class TaskManager{
  // constructor intialize the current id as 0 , and the tasks array as empty
  constructor(currentId = 0) {
    this.currentId = currentId; // initialize first object id as 0
    // checking if any item in the local storage, fetch that item id and make it as the current Id
    this.tasks = JSON.parse(localStorage.getItem('tasks_data')) || [];
    if (localStorage.getItem('tasks_data')){
      JSON.parse(localStorage.getItem('tasks_data')).forEach(element => {
        this.currentId = element.id; 
      });
    }
    this.sortedArray = [];
  }; // constructor

// add the newly created task object into the task array.
addTask(name, description, assignedTo, dueDate, status) {
  // validate all the inputs - isValidatedSuccessfully = true if successfull 
  let isValidatedSuccessfully = validateTaskForm(name, description, assignedTo, dueDate, status);
    // push into the tasks array if the input is validated successfully.  
     if (isValidatedSuccessfully) { 
       // checking if any item in the local storage, fetch that item id and make it as the current Id
      if (localStorage.getItem('tasks_data')){
        JSON.parse(localStorage.getItem('tasks_data')).forEach(element => {
          this.currentId = element.id;
        });
      }
      // increment the current task id by one
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
  this.getTasksStatus()
  return this.tasks;
 }



 // edit task
 editTask(taskId){
   // get the index of the given task id
    let index = this.tasks.findIndex(task=> task.id === taskId);
    // getting the task for that id , setting the values into the update form input fields 
    document.getElementById('edit_name').value=this.tasks[index].name;
    document.getElementById('edit_description').value=this.tasks[index].description;
    document.getElementById('edit_assign_to').value=this.tasks[index].assignedTo;
    document.getElementById('edit_duedate').value=this.tasks[index].dueDate;
    document.getElementById("index").value=index;
    
 }
 // update task
 updateTask(index,status){
    // update the array element 
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
  // if true means ok
  if (isDelete){
   let index = this.tasks.findIndex(task=> task.id === taskId) 
    // if that task found index will not be -1 , else the index will be -1
   if (index > -1){
     // remove that element from the array
    this.tasks.splice(index,1);
   }
   // update local storage
   localStorage.setItem('tasks_data',JSON.stringify(this.tasks));
   // reload the browser
   location.reload();
  }
 }
// update status when clickin the checkbox.
 updateStatus(taskId){
    let index = this.tasks.findIndex(task=> task.id === taskId)
    this.tasks[index].status = "DONE";
    localStorage.setItem('tasks_data',JSON.stringify(this.tasks));  
    location.reload();
 }

 // list task and its status

 getTasksStatus(){
    let tasksFromLocalStorage;
    if (localStorage.getItem('tasks_data')){
      tasksFromLocalStorage = localStorage.getItem('tasks_data') ;
    }
    // converting to object from string
    if (tasksFromLocalStorage){
      let tasks = JSON.parse(tasksFromLocalStorage);
      showTaskStatus(tasks);
    }
 }
// Sorting task based on the task due date.
 sortTask(){
   sortTasks(this.tasks);
 }

} // class end

const task = new TaskManager();





