let input = document.querySelector( ".input" );
let submit = document.querySelector( ".add" );
let tasksDiv = document.querySelector( ".tasks" );
let deleteAllBtn = document.querySelector( ".delete-all" );

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    submit.click();
  }
} );

// Empty array to store the tasks
let arryOfTasks = [];

// Check if there is tasks in local storage

if (localStorage.getItem("tasks"))
{
  arryOfTasks = JSON.parse( localStorage.getItem( "tasks" ) ); 
}

// Trigger get data from local storage function
getDataFromLocalStorage();

//  Add task

submit.onclick = function ()
{
  if ( input.value !== "" )
  {
    addTaskToArray( input.value );  
    input.value = "";
  }
}

// Click on task element
tasksDiv.addEventListener( "click", ( e ) =>
{
  // Delete button
  if (e.target.classList.contains("del"))
  {
    // Remove task from local storage
    deleteTaskWith( e.target.parentElement.getAttribute( "data-id" ) );
    // Remove element from page
    e.target.parentElement.remove();
  }
  // Task Element
  if ( e.target.classList.contains( "task" ) )
  {
    // Toggle completed to the task
    toggleStatusTAskWith( e.target.getAttribute( "data-id" ) );
    // Toggle done class
    e.target.classList.toggle( "done" );
  }
})

function addTaskToArray ( taskText )
{
  // Task data
  const task = {
    id: Date.now().toLocaleString(),
    title: taskText,
    completed: false,
  };
  // Push task to array of tasks
  arryOfTasks.push( task );
  // Add tasks to page
  addElementsToPageFrom( arryOfTasks );
  // Add tasks to local storage
  addDataToLocalStorageFrom( arryOfTasks );
}

function addElementsToPageFrom (arryOfTasks)
{
  // empty the tasks div
    tasksDiv.innerHTML = "";
      // Show or hide delete all button
  if (arryOfTasks.length > 0) {
    deleteAllBtn.style.display = "block";
  } else {
    deleteAllBtn.style.display = "none";
  }
  // looping on array of tasks
  arryOfTasks.forEach(task => {
    let div = document.createElement( "div" );
    div.className = "task";
    
    if (task.completed)
    {
      div.className = "task done"
    }
    div.setAttribute( "data-id", task.id );
    div.appendChild( document.createTextNode( task.title ) );
    let span = document.createElement( "span" );
    span.className = "del";
    span.appendChild( document.createTextNode( "Delete" ) );
    div.appendChild( span );
    // Add task div to taskes container
    tasksDiv.appendChild( div );
  });
}

function addDataToLocalStorageFrom ( arryOfTasks )
{
  window.localStorage.setItem( "tasks", JSON.stringify( arryOfTasks ) );
}

function getDataFromLocalStorage ()
{
  let data = window.localStorage.getItem( "tasks" );
  if (data)
  {
    let tasks = JSON.parse( data );
    addElementsToPageFrom( tasks );
  }
}

function deleteTaskWith ( taskId )
{
  arryOfTasks = arryOfTasks.filter( ( task ) => task.id != taskId );
  addDataToLocalStorageFrom( arryOfTasks );
}

function toggleStatusTAskWith ( taskId )
{
  for ( let i = 0; i < arryOfTasks.length; i++ )
  {
    if ( arryOfTasks[ i ].id == taskId )
    {
      arryOfTasks[i].completed == false ? (arryOfTasks[i].completed) = true : (arryOfTasks[i].completed = false)
    }
  }
  addDataToLocalStorageFrom( arryOfTasks );
}


deleteAllBtn.onclick = function () {
  // Empty the array
  arryOfTasks = [];

  // Clear localStorage
  localStorage.removeItem("tasks");

  // Remove tasks from the page
  tasksDiv.innerHTML = "";

  // Hide the button
  deleteAllBtn.style.display = "none";
};