import './styles.css';
import { todos } from './todos.js';
import bin from './bin.js';

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
