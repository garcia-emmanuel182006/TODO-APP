interface Task {
    id: string;
    text: string;
}

interface TaskHTMLModel {
    task_container: HTMLLIElement;
    text_container: HTMLParagraphElement;
    delete_button: HTMLButtonElement;

    wrapTags(): HTMLLIElement;
}
interface AppDataInput {
    text_input: HTMLInputElement;
    save_button: HTMLButtonElement;
    list_container: HTMLUListElement;
    count_container: HTMLSpanElement;
}

// Saved task in a map<id, text>
let savedTasks: Map<string, string> = new Map<string, string>();

const appInputs: AppDataInput = {
    text_input: document.getElementById('app_text') as HTMLInputElement,
    save_button: document.getElementById('app_save') as HTMLButtonElement,
    list_container: document.getElementById('app_list') as HTMLUListElement,
    count_container: document.getElementById('app_count') as HTMLSpanElement
}

let count: number = 0;

function updateCount(difference: number): void {
    count += difference;
    appInputs.count_container.textContent = count.toString();
}

function createHTMLTag (text: string, id: string): HTMLLIElement {
    let model: TaskHTMLModel = {
        task_container: document.createElement('li'),
        text_container: document.createElement('p'),
        delete_button: document.createElement('button'),

        // Put all the other tags inside the li tag
        wrapTags(): HTMLLIElement {
            this.task_container.append(
                this.text_container,
                this.delete_button
            );
            return this.task_container;
        }
    };

    // Set the container id and class values
    model.task_container.setAttribute('id', id);
    model.task_container.setAttribute('class', 'task-item');

    // Give all params a html tag

    model.text_container.textContent = text;
    model.text_container.setAttribute('class', 'task-text');

    // Set the logic for the delete button
    model.delete_button.textContent = '✕';
    model.delete_button.setAttribute('class', 'delete-button');
    model.delete_button.addEventListener('click', (ev:MouseEvent): void => {
        ev.preventDefault();

        if (model.task_container.classList.contains('completed')) {
            model.task_container.remove();
        }
        else {
            model.task_container.classList.add('completed');
            savedTasks.delete(id);
            updateCount(-1);
        }


    })

    return model.wrapTags();
}

function createTask(task_text: string): void {

    // Avoid empty inputs
    if (task_text === '' || task_text === null) {
        console.error('missing title or description');
        alert('Please enter a title and a description');
        return;
    }

    // Create a unique ID based on the time the task is created
    let task: Task = {
        id: Date.now().toString(),
        text: task_text
    }

    // Wrap everything inside a html tag
    let task_html_container: HTMLLIElement;

    task_html_container = createHTMLTag(task.text, task.id);

    // Use a fragment to move it to the html
    let fragment: DocumentFragment = document.createDocumentFragment();
    fragment.appendChild(task_html_container);

    appInputs.list_container.appendChild(fragment);

    // Save task in a local map
    savedTasks.set(task.id, task.text);
    updateCount(1);
}

window.addEventListener('DOMContentLoaded', () => {

    updateCount(0);

    appInputs.text_input.addEventListener('keydown', (event: KeyboardEvent): void => {
        event.stopPropagation();

        if (event.key === 'Enter') {
            event.preventDefault();
            createTask(appInputs.text_input.value);
        }
    })

    appInputs.save_button.addEventListener('click', (event: Event): void => {
        event.preventDefault();
        event.stopPropagation();

        createTask(appInputs.text_input.value);
    })
})
