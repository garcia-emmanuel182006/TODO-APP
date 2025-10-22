'use strict';

const appTitleInput = document.getElementById("app_title");
const appContentInput = document.getElementById("app_content");
const appSubmitButton = document.getElementById("app_submit");
const appListContainer = document.getElementById("app_list");

let savedTasks = new Map();

// Get task Saved.
function getTaskFromStorage () {
  
  // Handle empty list on load.
  if (localStorage.getItem("savedTasks") === null) {
    console.error("Could not get saved tasks.");
  }
  else {
    // Retrieve saved task from storage.
    let fragment = document.createDocumentFragment();
    let retrievedTasks = JSON.parse(localStorage.getItem("savedTasks"));
    
    // Reformating as a map.
    retrievedTasks.forEach((task) => {
      savedTasks.set(task[0], task[1]);
    });
    
    // Move each task to a document fragment.
    savedTasks.forEach((task, key) => {
      fragment.appendChild(createHtmlList(
        task.title,
        task.content,
        key,
        task.dateMade
      ))
    })
    
    // Render the fragment.
    appListContainer.appendChild(fragment);
    
  }
}

// Handles the data and creates a tag container.
function createHtmlList (title, content, id, date) {
  
  // Create a tag for the title
  let taskTitle = document.createElement("h3");
  taskTitle.setAttribute("class", "task-title");
  taskTitle.textContent = title;
  
  // create a tag for the content.
  let taskContent = document.createElement("p");
  taskContent.setAttribute('class', 'task-content');
  taskContent.textContent = content;
  
  // Create a tag for the date the task was made.
  const taskDate = document.createElement("p");
  taskDate.setAttribute("class", "list-item-date_stamp");
  taskDate.textContent = date;
  
  // Create the list tag.
  let htmlListElement = document.createElement('li');
  htmlListElement.setAttribute('id', id);
  htmlListElement.setAttribute('class', 'list-item');
  
  // Create a button to remove the list item.
  let htmlRemoveElement = document.createElement('button');
  htmlRemoveElement.setAttribute('class', 'delete-button');
  htmlRemoveElement.textContent = "Remove";
  htmlRemoveElement.addEventListener('click', e => {
    e.preventDefault();
    e.target.parentElement.remove();
    savedTasks.delete(id);
  });
  
  // Move everything inside the li element.
  htmlListElement.append(taskTitle, taskContent, taskDate, htmlRemoveElement);
  
  return htmlListElement;
}

//Save tasks on localStorage
function saveTasksOnStorage (savedTasks) {
  let stringifyTasks = JSON.stringify([...savedTasks]);
  
  localStorage.setItem('savedTasks', stringifyTasks);
}

// Handles the task creation.
function createTask (taskTitle, taskContent) {
  
  //Handle empty input
  if (appTitleInput.value === "" || appTitleInput.value == null) {
    console.error("Could not create task. Title is empty.");
    return;
  }
  
  // Create a unique ID based on the time the task is created.
  let taskID = Date.now().toString();
  let taskDateMade = new Date().toDateString();
  
  let newTask = createHtmlList(
    taskTitle,
    taskContent,
    taskID,
    taskDateMade);
  
  //Save tasks on a local map.
  savedTasks.set(
    taskID,
    {
      title: taskTitle,
      content: taskContent,
      dateMade: taskDateMade
    }
  );
  
  // Append new task to the list.
  appListContainer.append(newTask);
}

window.addEventListener('load', getTaskFromStorage);

window.addEventListener('beforeunload', (e) => {
  e.preventDefault();
  
  if (savedTasks.size === 0) {
    console.log('Nothing to save');
    savedTasks.clear();
    localStorage.clear();
    return;
  }
  saveTasksOnStorage(savedTasks);
});

window.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    createTask(appTitleInput.value, (appContentInput.value || "No content added."));
  }
});

appSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  createTask(appTitleInput.value, (appContentInput.value || "No content added."));
});
