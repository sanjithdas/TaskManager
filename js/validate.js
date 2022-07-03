 
/** input validation  */

// span element for  error display
const errName         = document.getElementById('errname');
const errDescription  = document.getElementById('errdescription');
const errAssignTo     = document.getElementById("errassignto");
const errDueDate      = document.getElementById("errduedate");
const errStatus       = document.getElementById("errstatus");

const currDate        = document.getElementById("show_date")

 
let formCreateTask    = document.getElementById("task_form");
 
// input validation starts
const validateTaskForm =(name,description,assign_to,duedate,status) =>{

  let nameFlag = false;
  let descriptionFlag = false;
  let assigntoFlag = false;
  let duedateFlag = false;
  let statusFlag = false;
  

  console.log(name,description,assign_to,duedate,status);

  // checking name is empty
  if (name===""){
    errName.innerHTML = "Please enter a valid task name more than 8 characters";
    errName.style.display="block";
    errName.style.fontSize="20px";
    errName.style.fontWeight="bold";
    errName.className = "alert-danger";
    nameFlag = true;
  }
  // checking the name is <=8 , should be longer than 8 characters.
  else if (name.length<8){
    errName.innerHTML = "Please enter a valid task name more than 8 characters.";
    errName.style.display="block";
    errName.style.fontSize="20px";
    errName.style.fontWeight="bold";
    errName.className = "alert-danger";
    nameFlag = true;
  }
  // checking for a numeric value
  else if (!(isNaN(name))){
    errName.innerHTML = "Please enter a valid task name more than 8 characters.";
    errName.style.display="block";
    errName.style.fontSize="20px";
    errName.style.fontWeight="bold";
    errName.className = "alert-danger";
    nameFlag = true;
  }
  else{
    errName.style.display="none";
    nameFlag = false;
  }

  // if description empty
  if (description===""){
    errDescription.innerHTML = "Please enter the description more than 15 characters.";
    errDescription.style.display="block";
    errDescription.style.fontSize="20px";
    errDescription.style.fontWeight="bold";
    errDescription.className = "alert-danger";
    descriptionFlag = true;
  }
  // checking the description is >15 , should be less than 15 characters.
  else if (description.length<15){
    errDescription.innerHTML = "Please enter a description more than 15 characters."
    errDescription.style.display="block";
    errDescription.style.fontSize="20px";
    errDescription.style.fontWeight="bold";
    errDescription.className = "alert-danger";
    descriptionFlag = true;
  }
  else{
    errDescription.style.display="none";
    descriptionFlag = false;
  }
  // if assignto is empty
  if (assign_to===""){
    errAssignTo.innerHTML = "Please enter the name more than 8 characters.";
    errAssignTo.style.display="block";
    errAssignTo.style.fontSize="20px";
    errAssignTo.style.fontWeight="bold";
    errAssignTo.className = "alert-danger";
    assigntoFlag = true;
  }
  // checking the assignto is >8 , should be less than 8 characters.
  else if (assign_to.length<8){
    errAssignTo.innerHTML = "Please enter a name more than 8 characters."
    errAssignTo.style.display="block";
    errAssignTo.style.fontSize="20px";
    errAssignTo.style.fontWeight="bold";
    errAssignTo.className = "alert-danger";
    assigntoFlag = true;
  }
  else if (!(isNaN(assign_to))){
    errAssignTo.innerHTML = "Please enter a name more than 8 characters."
    errAssignTo.style.display="block";
    errAssignTo.style.fontSize="20px";
    errAssignTo.style.fontWeight="bold";
    errAssignTo.className = "alert-danger";
    assigntoFlag = true;
  }
  else{
    errAssignTo.style.display="none";
    assigntoFlag = false;
  }
  // if duedate is empty
  if (duedate===""){
    errDueDate.innerHTML = "Please enter a date greater than or equal to the current date.";
    errDueDate.style.display="block";
    errDueDate.style.fontSize="20px";
    errDueDate.style.fontWeight="bold";
    errDueDate.className = "alert-danger";
    duedateFlag = true;
  }
  // if duedate is less than the current date
   
  else if (new Date(duedate) < currentDate() ){
    errDueDate.innerHTML = "Please enter a date greater than or equal to the current date.";
    errDueDate.style.display="block";
    errDueDate.style.fontSize="20px";
    errDueDate.style.fontWeight="bold";
    errDueDate.className = "alert-danger";
    duedateFlag = true;
  } 
  else{
    errDueDate.style.display="none";
    duedateFlag = false;
  }

  // if status empty
  if (status===""){
    errStatus.innerHTML = "Please choose the status";
    errStatus.style.display="block";
    errStatus.style.fontSize="20px";
    errStatus.style.fontWeight="bold";
    errStatus.className = "alert-danger";
    statusFlag = true;
  }
  else{
    errStatus.style.display="none";
    statusFlag = false;
  }

  console.log(nameFlag,descriptionFlag,assigntoFlag);
  if (!(nameFlag) && !(descriptionFlag) && !(assigntoFlag) && !(duedateFlag) && !(statusFlag)){
    return true;
  }
}

// return current date

const currentDate = () =>{
  let today = new Date();
  today.setHours(0,0,0,0);
  return today;
}

// display current date on the landing page in a user friendly format

const showCurrentTime = () =>{
  let today = new Date();
  let dateFormat = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  console.log(dateFormat);
  currDate.innerHTML = dateFormat;
}

// reset button - clear all the error messages

const resetErrorMessages = () =>{
  errName.style.display ="none"
 errDescription.style.display ="none";
 errAssignTo.style.display ="none";
 errDueDate.style.display ="none";
 errStatus.style.display ="none";
}

// individual field validation on lost focus

console.log(formCreateTask);
//formCreateTask.onpointerover = validateTaskForm

const validateMe = (fieldName, fieldValue) =>{
  console.log(fieldName,fieldValue);
  if (fieldName==="name"){
    if (fieldValue===""){
      errName.innerHTML = "Please enter a valid task name more than 8 characters";
      errName.style.display="block";
      errName.style.fontSize="20px";
      errName.style.fontWeight="bold";
      errName.className = "alert-danger";
      nameFlag = true;
    }
    // checking the name is <=8 , should be longer than 8 characters.
    else if (fieldValue.length<8){
      errName.innerHTML = "Please enter a valid task name more than 8 characters.";
      errName.style.display="block";
      errName.style.fontSize="20px";
      errName.style.fontWeight="bold";
      errName.className = "alert-danger";
      nameFlag = true;
    }
    // checking for a numeric value
    else if (!(isNaN(fieldValue))){
      errName.innerHTML = "Please enter a valid task name more than 8 characters.";
      errName.style.display="block";
      errName.style.fontSize="20px";
      errName.style.fontWeight="bold";
      errName.className = "alert-danger";
      nameFlag = true;
    }
    else{
      errName.style.display="none";
      nameFlag = false;
    }
  }
  if (fieldName==="description"){
    if (fieldValue===""){
      errDescription.innerHTML = "Please enter the description more than 15 characters.";
      errDescription.style.display="block";
      errDescription.style.fontSize="20px";
      errDescription.style.fontWeight="bold";
      errDescription.className = "alert-danger";
      descriptionFlag = true;
    }
    // checking the description is >15 , should be less than 15 characters.
    else if (fieldValue.length<15){
      errDescription.innerHTML = "Please enter a description more than 15 characters."
      errDescription.style.display="block";
      errDescription.style.fontSize="20px";
      errDescription.style.fontWeight="bold";
      errDescription.className = "alert-danger";
      descriptionFlag = true;
    }
    else{
      errDescription.style.display="none";
      descriptionFlag = false;
    }
  }

  if (fieldName==="assign_to"){
    if (fieldValue===""){
      errAssignTo.innerHTML = "Please enter the name more than 8 characters.";
      errAssignTo.style.display="block";
      errAssignTo.style.fontSize="20px";
      errAssignTo.style.fontWeight="bold";
      errAssignTo.className = "alert-danger";
      assigntoFlag = true;
    }
    // checking the assignto is >8 , should be less than 8 characters.
    else if (fieldValue.length<8){
      errAssignTo.innerHTML = "Please enter a name more than 8 characters."
      errAssignTo.style.display="block";
      errAssignTo.style.fontSize="20px";
      errAssignTo.style.fontWeight="bold";
      errAssignTo.className = "alert-danger";
      assigntoFlag = true;
    }
    else if (!(isNaN(fieldValue))){
      errAssignTo.innerHTML = "Please enter a name more than 8 characters."
      errAssignTo.style.display="block";
      errAssignTo.style.fontSize="20px";
      errAssignTo.style.fontWeight="bold";
      errAssignTo.className = "alert-danger";
      assigntoFlag = true;
    }
    else{
      errAssignTo.style.display="none";
      assigntoFlag = false;
    }
    if (fieldName==="duedate"){
      if (duedate===""){
        errDueDate.innerHTML = "Please enter a date greater than or equal to the current date.";
        errDueDate.style.display="block";
        errDueDate.style.fontSize="20px";
        errDueDate.style.fontWeight="bold";
        errDueDate.className = "alert-danger";
        duedateFlag = true;
      }
      // if duedate is less than the current date
       
      else if (new Date(duedate) < currentDate() ){
        errDueDate.innerHTML = "Please enter a date greater than or equal to the current date.";
        errDueDate.style.display="block";
        errDueDate.style.fontSize="20px";
        errDueDate.style.fontWeight="bold";
        errDueDate.className = "alert-danger";
        duedateFlag = true;
      } 
      else{
        errDueDate.style.display="none";
        duedateFlag = false;
      }
    }

    if (fieldName==="status"){
      if (fieldValue===""){
        errStatus.innerHTML = "Please choose the status";
        errStatus.style.display="block";
        errStatus.style.fontSize="20px";
        errStatus.style.fontWeight="bold";
        errStatus.className = "alert-danger";
        statusFlag = true;
      }
      else{
        errStatus.style.display="none";
        statusFlag = false;
      }
    }
  }
}

