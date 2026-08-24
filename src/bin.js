import { getTodoList } from './todos.js';

const bin = {
    render: function() {
        const main = document.getElementById("main");
        main.innerHTML = `<div id="binContent"></div>`;
        renderBin();
    }
};

function renderBin() {
    const binElement = document.getElementById('binContent');
    binElement.innerHTML = '';
    const todoList = getTodoList();
    todoList.forEach((todoObject, index) => {
        if (todoObject.deleted) {
            const todoItem = document.createElement('div');
            todoItem.innerHTML = `<span id="content">${todoObject.content}</span>
                                <span>${todoObject.dateCreated.toLocaleString()}</span>`;
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

