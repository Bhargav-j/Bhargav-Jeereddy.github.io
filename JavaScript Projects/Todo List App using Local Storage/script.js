window.addEventListener('load', () => {

    todos = JSON.parse(localStorage.getItem('todos')) || [];

    const nameInput = document.querySelector('#name');

    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    nameInput.addEventListener('change', Event => {
        localStorage.setItem("username", Event.target.value);
    })

    const newTodoFrom = document.querySelector("#new-todo-form");

    newTodoFrom.reset(); //will reset the data if page reloaded without submitting the data

    newTodoFrom.addEventListener('submit', event => {
        event.preventDefault();

        // Creating a object here from the form element 
        const todo = {
            content : event.target.content.value,
            category : event.target.category.value,
            done : false,
            createdAt : new Date().getTime()
        }

        todos.push(todo);

        localStorage.setItem("todos", JSON.stringify(todos));

        event.target.reset();

        DisplayTodos();
    })

    DisplayTodos();
})

function DisplayTodos(){
    const todoList = document.querySelector("#todo-list");

    todoList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add("todo-item");

        const label = document.createElement("label");
        const input = document.createElement("input");
        const span =  document.createElement("span");
        const content =  document.createElement("div");
        const actions =  document.createElement("div");
        const edit =  document.createElement("button");
        const Delete =  document.createElement("button");
        
        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        if (todo.category == 'personal'){
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }

        content.classList.add('todo-content');
        actions.classList.add('actions')
        edit.classList.add('edit')
        Delete.classList.add('delete')

        content.innerHTML = `<input type="text" value = "${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        Delete.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(Delete);
        
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if (todo.done){
            todoItem.classList.add('done');
        }

        // these event listeners are added to every edit button in all the todo list items
        // And trigger the one which we clicked

        input.addEventListener('click', event => {
            todo.done = event.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            DisplayTodos();
        })

        edit.addEventListener('click', event => {
            // Here we use used content.query selector instead of document.querySelector as we are finding input element from the content element
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', event => {
                input.setAttribute('readonly', true);
                // Here we are updating the content though the value entered in input field.
                todo.content = event.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        })

        Delete.addEventListener('click', event => {
            // we save the object using todo element and by click, we chnaged it to t. if t != todo, filter that from todo
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })
    })
}

