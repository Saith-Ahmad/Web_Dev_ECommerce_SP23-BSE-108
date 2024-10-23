const todoList = document.getElementById('todo-list');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');


function fetchTodos() {
  fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(response => response.json())
    .then(data => renderTodos(data));
}


function renderTodos(todos) {
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
      <span>${todo.title}</span>
      <div>
        <button class="btn btn-warning btn-sm" onclick="updateTodo(${todo.id})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTodo(${todo.id})">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}


todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTodo = {
    title: todoInput.value,
    completed: false,
  };

  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(data => {
      renderTodos([data]);
      todoInput.value = '';  
    });
});


function updateTodo(id) {
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ title: 'Updated Todo' }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(data => alert(`Todo ${id} updated!`));
}


function deleteTodo(id) {
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'DELETE',
  })
    .then(() => alert(`Todo ${id} deleted!`))
    .then(() => fetchTodos());  
}


fetchTodos();
