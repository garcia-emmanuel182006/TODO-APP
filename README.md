# TODO List Web App
### _A to-do list built with plain HTML, CSS, and typescript._

## Features
- Create, check and delete tasks
- Batch rendering with DocumentFragment to minimize reflows
- Responsive layout that works on desktop and mobile

## Usage
- Fill out the form at the top of the page:
- Title (string)
- Content (string)
- Click save to insert a new `<li>` into the task list
- Tasks are stored as entries in a `Map<string, Task>`

## Code Structure
- /index.html — semantic structure with a form and an empty `<ul>`
- /styles.css — simple, responsive layout
- /script.ts  — simple logic with a wrapper and input checks
- Render tasks with DocumentFragment on page load
- Handle form submissions and inline deletes