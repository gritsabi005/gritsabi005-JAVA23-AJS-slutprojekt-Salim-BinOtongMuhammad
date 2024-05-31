import { db } from "./firebaseConfig.js";
import { ref, push, update, onValue, remove } from "firebase/database";

const baseUrl = "https://model-united-nations-4a5ad-default-rtdb.europe-west1.firebasedatabase.app/subjects";

export async function addingSubject(subject){
    
}
export function displayTodos(todos){
    const todoContainer = document.querySelector('#todoContainer');
    todoContainer.innerHTML = '';

    for( const key in todos){
        const taskContainer = document.createElement('div');
        const taskEl = document.createElement('p');

        // Destructar task-objektet
        const {task, done} = todos[key];

        taskContainer.id = key;
        taskContainer.classList.add('taskItem')

        // Lägger till attributet data-done 
        taskContainer.dataset.done = done;
        taskEl.innerText = task;

        taskContainer.append(taskEl);

        if(done) {
            taskContainer.classList.add('done');
            const delBtn = document.createElement('button');
            delBtn.innerText = 'X';
            taskContainer.append(delBtn);
        }

        todoContainer.prepend(taskContainer);
    }
}