//Select DOM Element
const input = document.getElementById('todo_input')
const addBtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')

const saved = localStorage.getItem('todos')
const todos = saved? JSON.parse(saved) : [];
// todos ek array he

function saveTodo(){
    //Save todo storage 
    localStorage.setItem('todos', JSON.stringyfy(todos)) 
}
function createTodoNode(todo , index){
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
      checkbox.type='checkbox';
      checkbox.checked= !!todo.completed; 
     // !! used to convert in exact Boolean value
      checkbox.addEventListener("change", ()=>{
        todo.completed=checkbox.checked;
        // visual feedback strike-through when completed
        textSpan.style.textDecoration=todo.completed? "line-through":"";
        saveTodos();
    })
    const textSpan=document.createElement("span")
    textSpan.textContent=todo.text;
    textSpan.style.margin='0 8px';
    if(todo.completed){
        textSpan.style.textDecoration="line-through";
        }
        //Add double-click-event
        textSpan.addEventListener("dbclick" , ()=>{
            const newText=prompt("Edit todo list",todo.text);
            if(newText!==null){
                todo.text=newText.trim()
                textSpan.textContent=todo.text;
                saveTodos();
            }
        })
        // Delete todo Button
        const delBtn=document.createElement("button");
        delBtn.textContent="Delete";
        delBtn.addEventListener('click',()=>{
            todos.splice(index,1)
            render();
            saveTodos();
        })

        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(delBtn);
        return li
    }

function render(){
    list.innerHTML = '';

    todos.forEach((todo , index) => {
       const node = createTodoNode(todo,index)
       console.log(node, todo)
       list.appendChild(node) 
    });
}
function addTodo(){
    const text=input.value.trim()
    if(!text){
        return 
    }
    //Push new Todo Object
    todos.push({text,completed:false});
    input.value='';
    render()
    saveTodos()

}

addBtn.addEventListener("click",addTodo);
input.addEventListener("keydown",(e)=>{
    if(e.key == "ENTER"){
        addTodo();
    }
})
render();


/*
| **Component / Section**                                   | **Description**                                                                                                                                   | **Key Concept(s)**                                            |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------ |
| **`const input = document.getElementById('todo_input')`** | Selects the input field where the user types new tasks.                                                                                           | **DOM Manipulation**, **Element Selection**                   |
| **`const addBtn = document.getElementById('add-btn')`**   | Selects the button used to add a new to-do item.                                                                                                  | **Event Handling**, **DOM Selection**                         |
| **`const list = document.getElementById('todo-list')`**   | Selects the `<ul>` or `<ol>` element where all to-do items will be displayed.                                                                     | **DOM Interaction**, **Dynamic Rendering**                    |
| **`const saved = localStorage.getItem('todos')`**         | Retrieves the previously saved list of todos from browser storage (if any).                                                                       | **localStorage API**, **Data Persistence**                    |
| **`const todos = saved ? JSON.parse(saved) : []`**        | Converts the stored JSON string back to a JavaScript array; initializes an empty array if none exists.                                            | **JSON Parsing**, **Conditional (Ternary) Operator**          |
| **`function saveTodo()`**                                 | Saves the current `todos` array to `localStorage` using `JSON.stringify()`. *(Note: should be `JSON.stringify`, not `JSON.stringyfy`)*            | **Data Persistence**, **JSON Serialization**                  |
| **`function createTodoNode(todo, index)`**                | Creates a dynamic `<li>` element representing each to-do item.                                                                                    | **DOM Creation**, **Dynamic Rendering**                       |
| **`const checkbox = document.createElement('input')`**    | Creates a checkbox for marking tasks as completed.                                                                                                | **Dynamic Element Creation**                                  |
| **`checkbox.checked = !!todo.completed`**                 | Ensures the checkbox reflects whether the task is done. The `!!` operator converts value to a strict boolean.                                     | **Boolean Conversion**, **Data Binding**                      |
| **`checkbox.addEventListener('change', ...)`**            | Updates the completion status when checkbox state changes and gives visual feedback (line-through text).                                          | **Event Listener**, **State Update**, **Conditional Styling** |
| **`const textSpan = document.createElement('span')`**     | Displays the actual task text beside the checkbox.                                                                                                | **DOM Manipulation**, **Text Rendering**                      |
| **`textSpan.addEventListener('dblclick', ...)`**          | Lets the user edit a task by double-clicking on it; uses `prompt()` to take new input. *(Note: should be `"dblclick"`, not `"dbclick"`)*          | **Event Handling**, **Editing Data**, **User Interaction**    |
| **`const delBtn = document.createElement('button')`**     | Creates a “Delete” button for each task.                                                                                                          | **UI Element Creation**, **Event Handling**                   |
| **`delBtn.addEventListener('click', ...)`**               | Removes the selected task from the `todos` array and re-renders the list.                                                                         | **Array Manipulation**, **Re-Rendering**, **Event Handling**  |
| **`function render()`**                                   | Clears and repopulates the to-do list in the DOM by looping over `todos`.                                                                         | **Dynamic Rendering**, **Array Iteration (forEach)**          |
| **`list.innerHTML = ''`**                                 | Clears the current list before adding updated items.                                                                                              | **DOM Update**, **Prevent Duplication**                       |
| **`function addTodo()`**                                  | Adds a new to-do item from user input, pushes it to the array, and updates the UI & storage.                                                      | **Form Handling**, **Array Manipulation**, **Validation**     |
| **`todos.push({text, completed:false})`**                 | Stores each new task as an object with text and completion state.                                                                                 | **Objects**, **Array Management**                             |
| **`addBtn.addEventListener('click', addTodo)`**           | Adds functionality to the “Add” button.                                                                                                           | **Event Binding**, **User Interaction**                       |
| **`input.addEventListener('keydown', (e) => {...})`**     | Adds keyboard shortcut (press “Enter”) to add a new task. *(Note: should check for `"Enter"` not `"ENTER"`, since event keys are case-sensitive)* | **Keyboard Events**, **Conditional Check**                    |
| **`render();`**                                           | Calls `render()` initially to display any saved tasks from localStorage.                                                                          | **Initialization**, **Persistence Load**                      |
*/
