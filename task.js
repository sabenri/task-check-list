const listView = document.querySelector("#list-view");
const taskView = document.querySelector("#tasks-view");
const newListView = document.querySelector("#new-list-view");

const newListForm = document.querySelector("#new-list-form");
const listContainer = document.querySelector("#list-container");
const emptyListMessage = document.querySelector("#empty-list");
const listNameInput = document.querySelector("#list-name");
const listDeadlineInput = document.querySelector("#list-deadline");
const newListTaskInput = document.querySelector("#new-list-task");
const addNewListTaskButton = document.querySelector("#add-new-list-task");
const newListTaskContainer = document.querySelector("#new-list-task-container");
const currentList = document.querySelector("#current-list");

const taskInput = document.querySelector("#task-input");
const addTaskButton = document.querySelector("#add-task");
const taskList = document.querySelector("#task-list");
const completedTask = document.querySelector("#completed-task");

const openNewListButton = document.querySelector("#open-new-list");
const cancelNewListButton = document.querySelector("#cancel-new-list");
const backToListsButton = document.querySelector("#back-to-lists");

let lists = [];
let activeList = null;
let newListTasks = [];


function showListView() {
    listView.classList.remove("view-hidden");
    taskView.classList.add("view-hidden");
    newListView.classList.add("view-hidden");
}


function showNewListView() {
    listView.classList.add("view-hidden");
    taskView.classList.add("view-hidden");
    newListView.classList.remove("view-hidden");
}

function showTaskView () {
    listView.classList.add ("view-hidden");
    newListView.classList.add("view-hidden");
    taskView.classList.remove("view-hidden");
}
 

function displayTasks() {
    taskList.innerHTML = "";
    completedTask.innerHTML = "";

    activeList.tasks.forEach((task, index) => {
        
        const taskItem = document.createElement("li");

        const taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        taskCheckbox.checked = task.completed;

        const taskName = document.createElement("span");
        taskName.textContent = task.name;

        const deleteButton = document. createElement('button');
        deleteButton.textContent = "X";

        taskItem.appendChild(taskCheckbox);
        taskItem.appendChild(taskName);
        taskItem.appendChild(deleteButton);

        taskCheckbox.addEventListener("change", () => {
            task.completed = taskCheckbox.checked;
            saveLists();
            displayTasks();
        });

        deleteButton.addEventListener("click", () => {
            activeList.tasks.splice(index, 1);
            saveLists();
            displayTasks();
        });

        if (task.completed) {
            completedTask.appendChild(taskItem);
        } else {
            taskList.appendChild(taskItem);
        }

    });
}

function saveLists(){
    localStorage.setItem("taskLists", JSON.stringify(lists));
}

function loadLists() {
    const savedLists = localStorage.getItem("taskLists");

    if (savedLists) {
        lists = JSON.parse(savedLists);
    }
    
}

loadLists();
displayLists();

function displayLists() {
    listContainer.innerHTML = "";
    if(lists.length === 0) {
        emptyListMessage.style.display = "block";
        return;
    }

    emptyListMessage.style.display = "none";

    lists.forEach((list) => {
        const listCard = document.createElement("button");
        listCard.classList.add("list-card");

        const listTitle = document.createElement("h2");
        listTitle.textContent = list.name;
        
        const listDeadline = document.createElement("p");

        if (list.deadline) {
            const deadlineDate = new Date(list.deadline + "t00:00:00");
            listDeadline.textContent = 
            `Due: ${deadlineDate.toLocaleDateString()}`;
        } else {
            listDeadline.textContent = "No Deadline";
        }

        const taskCount = document.createElement("p");

        const totalTasks = list.tasks.length;
        const completedTask = list.tasks.filter(
            (task) => task.completed
        ).length;

        taskCount.textContent = 
        `${completedTask}/${totalTasks} tasks Completed`;

        listCard.appendChild(listTitle);
        listCard.appendChild(listDeadline);
        listCard.appendChild(taskCount);

        listCard.addEventListener("click", () => {
            activeList = list;
            currentList.textContent = list.name;
            displayTasks();
            showTaskView();
        });


        listContainer.appendChild(listCard);
    });
    
}


newListForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const listName = listNameInput.value.trim();
    const listDeadline = listDeadlineInput.value;

    if (listName === "") {
        return;
    }

    const newList = {
        name: listName,
        deadline: listDeadline,
        tasks: [...newListTasks]
    };

    lists.push(newList);
    saveLists();
    newListTasks = [];

    listNameInput.value = "",
    listDeadlineInput.value = "",

    displayLists();
    showListView();

    
});

addNewListTaskButton.addEventListener("click", () => {
    const taskName = newListTaskInput.value.trim();

    if (taskName === "") {
        return;     
    }

    const newTask = {
        name: taskName,
        completed: false
    };

    newListTasks.push(newTask);

    const taskItem = document.createElement("li");
    taskItem.textContent = taskName;
    newListTaskContainer.appendChild(taskItem);
    newListTaskInput.value = "";
    newListTaskInput.focus();
});



openNewListButton.addEventListener("click", () => {
    showNewListView();
});


cancelNewListButton.addEventListener("click", () => {
    showListView();
});


backToListsButton.addEventListener("click", () => {
    showListView();
});

addTaskButton.addEventListener("click", () => {
    const taskName = taskInput.value.trim();
    if (taskName === "" || activeList === null) {
        return;
    }
    const newTask = {
        name: taskName,
        completed: false
    };

    activeList.tasks.push(newTask);
    saveLists();
    taskInput.value = "";
    displayTasks();

});