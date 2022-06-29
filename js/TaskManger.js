
 
/* 
Task Manager class
Methods:
  1. Create Task - addTask method
  2. Display tasks - getAllTasks
  3. Get task with status - getTasksWithStatus
  4. 
*/

class TaskManager{
  // constructor intialize the current id as 0 , and the tasks array as empty
  constructor(currentId = 0) {
    this.currentId = currentId;
    this.tasks = [];
};

// add the newly created task object into the task array.
addTask(name, description, assignedTo, dueDate, status) {
  // validate all the inputs - isValidatedSuccessfully = true if successfull 
  let isValidatedSuccessfully = validateTaskForm(name, description, assignedTo, dueDate, status);
       const taskAdd = {
          id: this.currentId++,
          name: name,
          description: description,
          assignedTo: assignedTo,
          dueDate: dueDate,
          status: status,
      };
    // push into the tasks array if the input is validated successfully.  
    if (isValidatedSuccessfully) { 
      this.tasks.push(taskAdd);
    }
 }

 /* return all the tasks  from the tasks array 
  show current date
  display both information on the landing page when the page is loaded.
 */
 getAllTasks(){
  showCurrentTime();
  console.log(this.tasks);
  return this.tasks;
 }

 

}

const task = new TaskManager();
// task.addTask('Task1','Desc','Sanjith','01/07/2022','Done');
// task.addTask('Task2','Desc','Hatman','02/07/2022','Progress');
// task.addTask('Task3','Desc','Tania','03/07/2022','Pending');





