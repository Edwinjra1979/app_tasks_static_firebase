import {
    getTasks,
    onGetTasks,
    addTask,
    deleteTask,
    getTask,
    updateTask
  
} from './firebase.js';

let editStatus = false,
    id = '';

const w = window,
    d = document,
    taskForm = d.getElementById('task-form'),
    tasksContainer = d.getElementById('tasks-container');

w.addEventListener('DOMContentLoaded', async () => {  

    onGetTasks((querySnapshot)=>{
        
        tasksContainer.innerHTML = '';
       
        querySnapshot.forEach(doc=> {
            const tasks = doc.data();
            // console.log(doc.id);
            tasksContainer.innerHTML  += `
                <div class="card card-body mt-2 border-primary">
                    <h3 class="h5">${tasks.title}</h3>
                    <p>${tasks.description}</p>

                    <div>
                    <button data-id="${doc.id}" class="btn btn-primary btn-del">Delete</button>       
                    <button data-id="${doc.id}" class="btn btn-secondary btn-edit">Edit</button>
                    </div>
                          
                </div>
            `;
        })

       

        const btnDelete = tasksContainer.querySelectorAll('.btn-del');
        btnDelete.forEach(btn => {
            btn.addEventListener('click', ({target: {dataset}}) => {
                deleteTask(dataset.id);
            })
        })
        const btnEdit = tasksContainer.querySelectorAll('.btn-edit');
        btnEdit.forEach(btn => {
            btn.addEventListener('click', async({target: {dataset}}) => {
                const doc = await getTask(dataset.id);
                const task = doc.data();
                
                taskForm['task-title'].value = task.title;
                taskForm['task-description'].value = task.description;

                editStatus = true;
                id = dataset.id
                taskForm['task-save-btn'].innerHTML = 'Update'
            })
        })
    });

    // const querySnapshot = await getTasks();
 

  
});


taskForm.addEventListener('submit', e => {

    e.preventDefault();  

    const title = taskForm['task-title'].value;
    const description = taskForm['task-description'].value;

    if(!editStatus){
        addTask(title, description);
    }else{
        let data = {title, description}
        updateTask(id, data);
        editStatus = false;
    }
    
  
    taskForm.reset();

})