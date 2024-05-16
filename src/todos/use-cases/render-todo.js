import { Todo } from '../models/todo.model'
import { createTodoHTML } from "./create-todo-html"


let element

export const renderTodos =(elementoId, todos=[])=>{

if (!element)
    element =document.querySelector(elementoId)

if (!element) throw new Error (`Elemento ${element} no existe`)

    element.innerHTML =''

    todos.forEach(todo => {
        element.append(createTodoHTML(todo))
    })

}