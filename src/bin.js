import { getTodoList, saveTodoList } from './todos.js';

const bin = {
    render: function() {
        const main = document.getElementById("main");
        main.innerHTML = `<button id="emptyBin">Empty Bin</button>
        <div id="binContent"></div>`;
        renderBin();
    }
};

function renderBin() {
    const emptyBinButton = document.getElementById('emptyBin');
    emptyBinButton.addEventListener('click', () => {
        const todoList = getTodoList();
        for (let i = todoList.length - 1; i >= 0; i--) {
            if (todoList[i].deleted) {
                todoList.splice(i, 1);
            }
        }
        saveTodoList();
        renderBin();
    });
    const binElement = document.getElementById('binContent');
    binElement.innerHTML = '';
    const todoList = getTodoList();
    todoList.forEach((todoObject) => {
        if (todoObject.deleted) {
            const todoItem = document.createElement('div');
            todoItem.innerHTML = `<span id="content">${todoObject.content}</span>
                                <span>${todoObject.dateCreated}</span>`;
            binElement.appendChild(todoItem);
            if (todoObject.done) {
                    const contentElement = todoItem.querySelector('#content');
                    contentElement.style = "text-decoration: line-through;";
                } else {
                    todoItem.style = "text-decoration: none;";
                }
        }
    });
}

export default bin;

