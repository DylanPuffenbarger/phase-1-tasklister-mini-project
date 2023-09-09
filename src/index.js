class Task {
    constructor(description){
        this.desc = description;
    }

    toHTML = () => `
    <li>
        ${this.desc}
        <button data-description="${this.desc}">✓</button>
    </li>
    `;
}

class TaskList {
    constructor(...tasks){
        this.array = [];
        for (t in tasks){
            this.append(t);
        }
    }
    
    addTask(description){
        this.array.push(new Task(description.toString()))
    }

    removeTask(description){
        this.array = this.array.filter((task) => task.desc !== description);
    }

    toHTML = () => this.array.map((task) => task.toHTML()).join('');
}




document.addEventListener("DOMContentLoaded", () => {
    let taskList = new TaskList();
    const newTaskForm = document.getElementById('create-task-form');
    const newTaskDesc = document.getElementById('new-task-description');
    const taskUl = document.getElementById('tasks');
    
    const updateList = () => {taskUl.innerHTML = taskList.toHTML();}
    
    document.addEventListener('submit', (e) => {
        e.preventDefault();
        taskList.addTask(newTaskDesc.value);
        e.target.reset();
        updateList();
    });

    document.addEventListener('click', (e) => {
        if (e.target.nodeName === 'BUTTON'){
            taskList.removeTask(e.target.dataset.description);
            updateList();
        }
    })
});

