import storageAvailable from './storageTest.js';
import { todoListProviderByCatagory } from './todoListProviderByCatagory.js';

const { saveTodoList, appendTodoList, getTodoList } = todoListProviderByCatagory();


const todos = {
    render : function() {
        console.log("Rendering todos");
        const main = document.getElementById("main");
        main.innerHTML = `<button id="createNewTodo"> Create New Todo +</button>
            <div id="todoCreater"></div>
            <div id="todoList"></div>
            </div>`;
        const newTodoButton = document.getElementById('createNewTodo');
        newTodoButton.addEventListener('click', () => {
            const todoCreater = document.getElementById('todoCreater');
            todoCreater.innerHTML = `<input type="checkbox" disabled>
                                <input type="text" id="todoContent" placeholder="What's the todo?">
                                <button type="submit" id="createTodo">Create </button>
                                <button type="button" id="cancelTodo">Cancel X</button>`;
            const submitTodoButton = document.getElementById('createTodo');
            const cancelTodoButton = document.getElementById('cancelTodo');
            cancelTodoButton.addEventListener('click', () => {
                todoCreater.innerHTML = '';
            });
            submitTodoButton.addEventListener('click', () => {
                const todoContent = document.getElementById('todoContent').value;
                const newTodo = createTodo(todoContent);
                appendTodoList(newTodo);
                todos.renderTodoList();
            });
        });
        renderTodoList();
    },
    renderTodoList: renderTodoList
};  

function createTodo(cont) {
    const content = cont;
    const dateCreated = new Date().toDateString();
    let done = false;
    let deleted = false;
    return {
        content,
        dateCreated,
        done,
        deleted,
    }
}

function renderTodoList() {
    console.log("Rendering todo list");
    const todoListElement = document.getElementById('todoList');
    todoListElement.innerHTML = '';
    getTodoList().forEach((todoObject, index) => {
        // console.log("Rendering todo: " + todoObject.content);
        if (!todoObject.deleted) {
            const todoItem = document.createElement('div');
            todoItem.innerHTML = `<input type="checkbox" id="todoCheckbox">
                                <span id="content">${todoObject.content}</span>
                                <span>${todoObject.dateCreated}</span>
                                <button type="button" id="deleteTodo">Delete</button>`;
            todoListElement.appendChild(todoItem);
            if (todoObject.done) {
                    const contentElement = todoItem.querySelector('#content');
                    contentElement.style = "text-decoration: line-through;";
                } else {
                    todoItem.style = "text-decoration: none;";
                }
            const deleteButton = todoItem.querySelector('#deleteTodo');
            deleteButton.addEventListener('click', () => {
                getTodoList()[index].deleted = true;
                saveTodoList();
                renderTodoList();
            });
            const checkbox = todoItem.querySelector('#todoCheckbox');
            checkbox.addEventListener('change', () => {
                getTodoList()[index].done = !todoObject.done;
                saveTodoList();
                renderTodoList();
            });
        }
    });
}



export { todos };