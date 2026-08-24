import './styles.css';

let todoList = [];

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
    });
});

function createTodo(cont) {
    const content = cont;
    const dateCreated = new Date();
    let done = false;
    let deleted = false;
    return {
        content,
        dateCreated,
        done,
        deleted,
        delete: function() {
            this.deleted = true;
        },
        toggle: function() {
            this.done = !this.done;
        }
    }
}

function appendTodoList(todoObject) {
    todoList.push(todoObject);
    renderTodoList();
}

function renderTodoList() {
    const todoListElement = document.getElementById('todoList');
    todoListElement.innerHTML = '';
    todoList.forEach((todoObject, index) => {
        if (!todoObject.deleted) {
            const todoItem = document.createElement('li');
            todoItem.innerHTML = `<input type="checkbox" id="todoCheckbox">
                                <span>${todoObject.content}</span>
                                <span>${todoObject.dateCreated.toLocaleString()}</span>
                                <button type="button" id="deleteTodo">Delete</button>`;
            todoListElement.appendChild(todoItem);
            const deleteButton = todoItem.querySelector('#deleteTodo');
            deleteButton.addEventListener('click', () => {
                todoObject.delete();
                renderTodoList();
            });
            const checkbox = todoItem.querySelector('#todoCheckbox');
            checkbox.addEventListener('change', () => {
                todoObject.toggle();
                if (todoObject.done) {
                    todoItem.style.textDecoration = 'line-through';
                } else {
                    todoItem.style.textDecoration = 'none';
                }
            });
        }
    });
}
