const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

loadTodos()

// učitavamo sve naše obaveze iz lokalnog skladišta
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos'))

    if(todos != undefined) {
        todos.forEach(todo => addTodo(todo.text, todo.isCompleted))
    }
}

// kada detekujemo taster, tačnije Enter, dodaćemo novu obavezu na spisak obaveza
input.addEventListener("keyup", function(event) {
    if (event.code == 'Enter') {
        // alert('Kliknuo enter!')
        addTodo(input.value, false)
    }
})

// funkcija za dodavanje nove obaveze ili obaveze pročitane iz lokalnog skladišta
function addTodo(todoText, isCompleted) {

    const todoEl = document.createElement('li')
    todoEl.innerText = todoText
    
    if (isCompleted) {
        todoEl.classList.add('completed')
    }    

    todoEl.addEventListener('click', () => {
        todoEl.classList.toggle('completed')
        updateLocalStorage()
    })

    todoEl.addEventListener('contextmenu', (e) => {
        e.preventDefault()

        todoEl.remove()
        updateLocalStorage()
    }) 

    todosUL.appendChild(todoEl)
    input.value = ''

    updateLocalStorage()
}

// funkcija za čuvanje obaveza u okviru lokalnog skladišta
function updateLocalStorage() {
    todosEl = document.querySelectorAll('li')

    const todos = []

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            isCompleted: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}