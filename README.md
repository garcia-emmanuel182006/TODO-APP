# TODO List Web App
### _A lightweight, accessible, and performant to-do list built with plain HTML, CSS, and JavaScript. Tasks are stored in localStorage as a serialized Map so your list persists across sessions without a backend._

## Features
- Create, edit, and delete tasks
- Persist tasks in localStorage using a string → object Map
- Unique ID assigned to each task for reliable updates
- Accessible markup with semantic tags and ARIA attributes
- Batch rendering with DocumentFragment to minimize reflows
- Responsive layout that works on desktop and mobile

## Demo
- Open index.html in your browser
- Enter a title and content for a new task
- Click Add Task to append to the list
- Tasks remain after refresh thanks to localStorage

## Installation
- Clone the repository
  git clone
- Navigate into the project folder
  `cd todo-web-app`
- Open index.html in any modern browser

## Usage
- Fill out the form at the top of the page:
- Title (string)
- Content (string)
- Date (automatically assigned)
- Click Add Task to insert a new `<li>` into the task list
- Tasks are stored as entries in a `Map<string, Task>`
- On page load, parse and restore:
  ```Javascript
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
    
    appListContainer.appendChild(fragment);
  ```

## Code Structure
- /index.html — semantic structure with a form and an empty `<ul>`
- /styles.css — simple, responsive layout and utility classes
- /script.js
- Initialize and restore Map from localStorage
- Render tasks with DocumentFragment on page load
- Handle form submissions and inline deletes
- Serialize and save Map back to localStorage


