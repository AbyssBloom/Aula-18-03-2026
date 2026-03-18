let tasks = [];
let currentFilter ='all';


document.addEventListener('DOMContentLoaded',()=>{
    loadTasks();
    updateTasksDisplay();
})


//Adicionar tarefas
function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();


    if(taskText === '') {
        alert('por favor, digite uma tarefa!');
        return;
    }


    const newTask = {
        id:Date.now(),
        text:taskText,
        completed:false,
        date: new Date().toLocaleDateString('pt-BR')
    };


    tasks.push(newTask);
    saveTasks();
    updateTasksDisplay();
    input.value = '';
    input.focus();
}


function toggleTask(taskId){
    const task = tasks.find(t => t.id === taskId);
    if(task){
        task.completed = !task.completed;
        saveTasks();
        updateTasksDisplay();
    }
}


function deleteTask(taskId) {
    tasks = tasks.filter(t=> t.id !== taskId);
    saveTasks();
    updateTasksDisplay();
}


function filterTasks(filter) {
    currentFilter = filter;
    document.querySelectorAll(',filter-btn').forEach(btn =>{
        btn.classList.remove('activate');
    })
    event.target.classList.add('activate')


    updateTasksDisplay();
}


function clearCompleted() {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    updateTasksDisplay();
}


function updateTasksDisplay(){
    const container = document.getElementById('tasksContainer');


    const filteredTasks = getFilteredTasks();


    if (filteredTasks.lenght === 0) {
        container.innerHTML = '<div class="empty-message">nenhuma Tarefa Criada</div>';
    } else{
        container.innerHTML = filteredTasks.map(task => createTaskHTML(task)).join('');
    }
    updateTasksCount();
}


function getFilteredTasks() {
    switch (currentFilter) {
        case 'activate':
            return tasks.filter(t => !t.completed);
        case 'completed':
            return tasks.filter(t => t.completed);
        default:
            return tasks;
    }
}


function createTaskHTML(task) {
    return `
    <div class="task-item" data-id="${task.id}">
        <input type="checkbox" class="task-checkbox"
            ${task.completed ? 'checked' : ''}
            onchange="toggleTask(${task.id})">
        <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
        <span class="task-date"> ${task.date}</span>
        <button class="delete-btn" onclick="deleteTask(${task.id})">X</button>
        </div>


    `
}


function updateTasksCount(){
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t=>t.completed).length;
    const activeTasks =  totalTasks - completedTasks;


    const countElement = document.getElementById('taskCount');
    countElement.innerHTML = `Total : ${totalTasks} | Ativas : ${activeTasks} | Concluidas ${completedTasks}`;
}


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks(){
    const savedTasks = localStorage.getItem('tasks');
    if(savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}


function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme',theme);
}


//carregar tema salvo


const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}



