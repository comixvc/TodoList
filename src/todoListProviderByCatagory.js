import storageAvailable from './storageTest.js';
import { todos } from './todos.js';
import { switchWindow } from './index.js';

if (storageAvailable('localStorage')) { 
    var todoList = JSON.parse(localStorage.getItem('todoList')) || [];
} else {
    console.log("Storage not available!");
}


function renderCatagories() { 
    const catagoryList = document.getElementById('categoryList');
    catagoryList.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        const catagoryName = localStorage.key(i);
        const catagoryButton = document.createElement('button');
        catagoryButton.textContent = catagoryName;
        catagoryButton.setAttribute('data-category', catagoryName);
        catagoryList.appendChild(catagoryButton);
        catagoryButton.addEventListener('click', () => {
            switchWindow(todos);
            catagory.setCatagory(catagoryName);

            todos.renderTodoList();
        });
    }
}

const catagory = (function catagory() {
    const catagoryList = [];
    let currentCatagory = localStorage.key(0) || "Default";
    let currentTodoList = JSON.parse(localStorage.getItem(currentCatagory)) || [];
    for (let i = 0; i < localStorage.length; i++) {
        const catagoryName = localStorage.key(i);
        catagoryList.push(catagoryName);
    }
    function setCatagory(catagoryName) {
        console.log("Setting catagory to: " + catagoryName);
        currentCatagory = catagoryName;
        currentTodoList = JSON.parse(localStorage.getItem(currentCatagory)) || [];
    }
    function getCatagory() {
        return currentCatagory;
    }
    function getCurrentTodoList() {
        // console.log(currentTodoList);
        return currentTodoList;
    }
    return {
        setCatagory,
        getCatagory,
        getCurrentTodoList
    }
})();

catagory.setCatagory("Default");

function todoListProviderByCatagory() {
    function saveTodoList() {
        if (storageAvailable('localStorage')) {
            localStorage.setItem(catagory.getCatagory(), JSON.stringify(catagory.getCurrentTodoList()));
        } else {
            console.log("Storage not available!");
        }
    }   

    function appendTodoList(todoObject) {
        catagory.getCurrentTodoList().push(todoObject);
        saveTodoList();
        
    }

    function getTodoList() {
        console.log("Getting todo list for catagory: " + catagory.getCatagory());
        return catagory.getCurrentTodoList();
    }
    return {
        saveTodoList,
        appendTodoList,
        getTodoList
    }
}


export { todoListProviderByCatagory, renderCatagories };