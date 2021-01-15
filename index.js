//Referencias html

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const clearBtn = document.querySelector('#clear-completed');
const ulFiltros = document.querySelector('.filters');

//Clases

class Todo {

    constructor( tarea ) {

        this.tarea = tarea;
        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();

    }
}

class TodoList {

    constructor() {

        this.cargarLocalStorage();
    
    }

    nuevoTodo( todo ) {

        this.todos.push( todo );
        this.guardarLocalStorage();

    }

    elminarTodo( id ) {

        this.todos = this.todos.filter( todo => todo.id != id)
        this.guardarLocalStorage();

    }

    marcarCompletado( id ) {

        for( const todo of this.todos ) {

            console.log(id, todo.id);

            if ( todo.id == id ) {

                todo.completado = !todo.completado;

                this.guardarLocalStorage();

                break;
            }
        }
    }

    eliminarCompletados() {

        this.todos = this.todos.filter( todo => !todo.completado);
        this.guardarLocalStorage();

    }

    guardarLocalStorage() { 

        localStorage.setItem('todo', JSON.stringify( this.todos ) ); 

    }

    cargarLocalStorage() {

        this.todos = ( localStorage.getItem('todo') ) 
                    ? JSON.parse( localStorage.getItem('todo') )
                    : [];

    }
}

const todoList = new TodoList();

//Funciones

const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ ( todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit">
    </li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append( div.firstElementChild );
    
    return div.firstElementChild;
}

todoList.todos.forEach(todo => crearTodoHtml( todo ));

//Eventos

txtInput.addEventListener('keyup', ( event ) => {
    
    if (event.keyCode === 13 && txtInput.value.length > 0) {

        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo ); 
        crearTodoHtml( nuevoTodo ); 
        txtInput.value = '';

    }

});

divTodoList.addEventListener('click', (event) => {
    
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement; 
    const todoId = todoElemento.getAttribute('data-id');
    
    if( nombreElemento.includes('input') ){

        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');

    } else if( nombreElemento.includes('button')) {

        todoList.elminarTodo( todoId );
        divTodoList.removeChild( todoElemento );

    }

})

clearBtn.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length - 1; i >= 0; i--){

        const elemento = divTodoList.children[i];
        
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild( elemento );
        }
    }

});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if( !filtro ) { return; }

});