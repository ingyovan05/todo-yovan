
import html from './app.html?raw'
import todoStore, {Filters} from  '../store/todo.store'
import { renderPending, renderTodos } from './use-cases'

const ElementsIDs = {
        ClearCompletedButtom: '.clear-completed',
        TodoList: '.todo-list',
        NewTodoInput: '#new-todo-input',
        TodoFilters: '.filtro',
        PendingCountLabel: '#pending-count',
}

export const App = (elementId) => {

const displayTodos =() => {          
        const todos = todoStore.getTodos(todoStore.getCurrentFilter())
        renderTodos(ElementsIDs.TodoList , todos)
        updatePendingTodo()
}


const updatePendingTodo = () => {
        renderPending(ElementsIDs.PendingCountLabel)
}

(()=> {
        const app =document.createElement('div')
        app.innerHTML = html
        document.querySelector(elementId).append(app)
        displayTodos()
})()

//referencias HTML
const newDescriptionInput =document.querySelector(ElementsIDs.NewTodoInput)
const todoListUL =document.querySelector(ElementsIDs.TodoList)
const Clear_Completed =document.querySelector(ElementsIDs.ClearCompletedButtom)
const filtersLIs =document.querySelectorAll(ElementsIDs.TodoFilters)


//Listeners
newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode != 13) return //Presiono enter sigue
                if(event.target.value.trim().length ===0) return
        todoStore.addTodo(event.target.value)
        displayTodos()
        event.target.value=''
})

todoListUL.addEventListener('click', (event) => {
        const element =event.target.closest('[data-id]')
        todoStore.toggleTodo(element.getAttribute('data-id'))    
        displayTodos()    
})

todoListUL.addEventListener('click', (event) => {
        if (event.target.className != 'destroy') return
        const element =event.target.closest('[data-id]')
        todoStore.deleteTodo(element.getAttribute('data-id'))    
        displayTodos()    
})

Clear_Completed.addEventListener('click',() =>{
        todoStore.deleteCompleted()
        displayTodos()   
})

filtersLIs.forEach( element => {
        element.addEventListener('click' , (element) => {
                filtersLIs.forEach(el => el.classList.remove('selected'))
                element.target.classList.add('selected')
        switch (element.target.text){
                case 'Todos':
                        todoStore.setFilter(Filters.All)
                        break
                case 'Pendientes':
                        todoStore.setFilter(Filters.Pending)
                        break                        
                case 'Completados':
                        todoStore.setFilter(Filters.Completed)
                        break
                        
        }
        displayTodos()
        })
})

}