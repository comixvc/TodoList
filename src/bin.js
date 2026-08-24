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
            const todoItem = document.createElement('p');
            todoItem.innerHTML = `<span>${todoObject.content}</span>
                                <span>${todoObject.dateCreated.toLocaleString()}</span>`;
            binElement.appendChild(todoItem);
        }
    });
}

export default bin;

