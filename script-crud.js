// const { JSON, json } = require("sequelize")
// const { Json } = require("sequelize/types/utils")

const taskListContainer = document.querySelector('.app__section-task-list')
const formTask = document.querySelector('.app__form-add-task')
const toggleFormTaskBtn = document.querySelector('.app__button--add-task')
const untoggleFormTaskBtn = document.querySelector('.app__form-footer__button--cancel')
const btnDelete = document.querySelector('.app__form-footer__button--delete')
const btnDeleteAllTasks = document.querySelector('#btn-remover-todas')
const formLabel = document.querySelector('.app__form-label')
const textArea = document.querySelector('.app__form-textarea')
const btnDeleteDoneTasks = document.querySelector('#btn-remover-concluidas')

const localStorageTasks = localStorage.getItem('tarefas')

const taskActiveDescription = document.querySelector('.app__section-active-task-description')

let tarefas = localStorageTasks ? JSON.parse(localStorageTasks) : [];

const taskIconSvg = `<svg width="18" height="14" viewBox="0 0 18 14" fill="none"
xmlns="http://www.w3.org/2000/svg">
<path
    d="M6 11.1719L16.5938 0.578125L18 1.98438L6 13.9844L0.421875 8.40625L1.82812 7L6 11.1719Z"
    fill="white" />
</svg>`

let selectedTask = null
let selectedTaskItem = null

let tarefaEmEdicao = null
let paragraphEmEdicao = null

const selectTask = (task, li) => {
    
    const btn = document.querySelectorAll('.app__section-task-list-item-active')

    for (let i = 0; i < btn.length; i++) {
        console.log(btn[i]);
        const element = btn[i];
        element.classList.remove('app__section-task-list-item-active')
    }

    if (selectedTask == task) {
        taskActiveDescription.textContent = null
        selectedTaskItem = null
        selectedTask = null
        return
    } 

    selectedTask = task
    selectedTaskItem = li
    taskActiveDescription.textContent = task.descricao

    li.classList.add('app__section-task-list-item-active')

}

function clearForm() {
    tarefaEmEdicao = null
    paragraphEmEdicao = null
    textArea.value = ''
    formTask.classList.add('hidden')
}

function selecionaTarefaParaEditar(task, element) {
    if(tarefaEmEdicao == task) {
        clearForm()
        return
    }

    formLabel.textContent = 'Editando Tarefa'
    tarefaEmEdicao = task
    paragraphEmEdicao = element
    textArea.value = task.descricao
    formTask.classList.remove('hidden')
}

function createTask(tarefa) {
    const li = document.createElement('li')
    const svgIcon = document.createElement('svg')
    const paragraph = document.createElement('p')
    const button = document.createElement('button')

    li.classList.add('app__section-task-list-item')
    svgIcon.innerHTML = taskIconSvg

    button.classList.add('app_button-edit')
    button.innerHTML = `<img src="/imagens/edit.png">`


    paragraph.classList.add('app__section-task-list-item-description')
    paragraph.textContent = tarefa.descricao

    li.onclick = () => {
        selectTask(tarefa, li)
    }

    button.addEventListener('click', (event) => {
        event.stopPropagation()
        selecionaTarefaParaEditar(tarefa, paragraph)
    })

    svgIcon.addEventListener('click', (event) => {
        if(tarefa == selectedTask){
            event.stopPropagation()
            button.setAttribute('disabled', true)
            li.classList.add('app__section-task-list-item-complete')
            selectedTask.concluida = true
            updateLocalStorage()
        }

    })

    if(tarefa.concluida){
        button.setAttribute('disabled', true)
        li.classList.add('app__section-task-list-item-complete')
    }

    li.appendChild(svgIcon)
    li.appendChild(paragraph)
    li.appendChild(button)

    return li
}

tarefas.forEach(task => {
    const taskItem = createTask(task)
    taskListContainer.appendChild(taskItem)
})

toggleFormTaskBtn.addEventListener('click', () => {
    formLabel.textContent = 'Adicionando Tarefa'
    formTask.classList.toggle('hidden')
})
untoggleFormTaskBtn.addEventListener('click', () => {
    formTask.classList.toggle('hidden')
    clearForm()
})

btnDelete.addEventListener('click', () => {
    if(selectedTask) {
        const index = tarefas.indexOf(selectedTask)

        if(index !== -1) {
            tarefas.splice(index, 1)
        }

        selectedTaskItem.remove()
        tarefas.filter(t=> t!= selectedTask)
        selectedTaskItem = null
        selectedTask = null
    }
    updateLocalStorage()
    clearForm()
})

const updateLocalStorage = () => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

formTask.addEventListener('submit', (event) => {
    event.preventDefault()

    if(tarefaEmEdicao) {
        tarefaEmEdicao.descricao = textArea.value
        paragraphEmEdicao.textContent = textArea.value
    } else {
        const task = {
            descricao: textArea.value,
            concluida: false
        }    
        tarefas.push(task)
        const taskItem = createTask(task)
        taskListContainer.appendChild(taskItem)
    }
    
    updateLocalStorage()
    clearForm()
})

document.addEventListener('TarefaFinalizada', function (e) {
    if(selectedTask) {
        selectedTask.concluida = true
        selectedTaskItem.classList.add('app__section-task-list-item-complete')
        selectedTaskItem.querySelector('button').setAttribute('disabled', true)
        updateLocalStorage()
    }
})


const clearAllTasks = (task) => {
    tarefas.forEach(() => {
        taskListContainer.remove()
    })
    localStorage.removeItem(task)
}

for (let i = 0; i < taskListContainer.length; i++){
    console.log(taskListContainer);
}
console.log();

function clearAllDoneTasks (task){

    const allDoneTasks = document.querySelectorAll('.app__section-task-list-item-complete')

    for (let i = 0; i < allDoneTasks.length; i++) {
        const element = allDoneTasks[i];
        element.remove()
    }

    for (let i = 0; i < task.length; i++) {
        
        let element = task[i]
        if (element.concluida === true) {
            task.splice(element, 1)
        }
    }
    updateLocalStorage()
}

btnDeleteDoneTasks.addEventListener('click', (event) => {
    event.stopPropagation()
    clearAllDoneTasks(tarefas)
})

btnDeleteAllTasks.addEventListener('click', (event) => {
    event.stopPropagation()
    clearAllTasks('tarefas')
})
