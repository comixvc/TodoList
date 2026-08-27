import './styles.css';
import { todos } from './todos.js';
import bin from './bin.js';
import { renderCatagories } from './todoListProviderByCatagory.js';

renderCatagories();

const createNewCategoryButton = document.getElementById('createNewCategory');
createNewCategoryButton.addEventListener('click', () => {
    const catagortList = document.getElementById('categoryList');
    const catagoryCreator = document.getElementById('catagoryCreator');
    catagoryCreator.innerHTML = `<input type="text" id="newCategoryName" placeholder="Enter category name">
                                <button type="submit" id="createCategory">Create </button>
                                <button type="button" id="cancelCategory">Cancel</button>`;
    const createCategoryButton = document.getElementById('createCategory');
    const cancelCategoryButton = document.getElementById('cancelCategory');
    cancelCategoryButton.addEventListener('click', () => {
        catagoryCreator.innerHTML = '';
    });
    createCategoryButton.addEventListener('click', () => {
        const newCategoryName = document.getElementById('newCategoryName').value;
        localStorage.setItem(newCategoryName, JSON.stringify([]));
        renderCatagories();
    });
});




switchWindow(todos);
const todosButton = document.getElementById('TodosButton');
todosButton.addEventListener('click', () => {
    switchWindow(todos);
});
const binButton = document.getElementById('BinButton');
binButton.addEventListener('click', () => {
    switchWindow(bin);
});

function switchWindow(windowName) {
    windowName.render();
}
 export { switchWindow };
