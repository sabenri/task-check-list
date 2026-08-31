const listView = document.querySelector("#list-view");
const taskView = document.querySelector("#tasks-view");
const newListView = document.querySelector("#new-list-view");

const newListForm = document.querySelector("#new-list-form");
const listContainer = document.querySelector("#list-container");
const emptyListMessage = document.querySelector("#empty-list");
const listNameInput = document.querySelector("#list-name");
const listDeadlineInput = document.querySelector("#list-deadline");
const currentList = document.querySelector("#current-list");

const openNewListButton = document.querySelector("#open-new-list");
const cancelNewListButton = document.querySelector("#cancel-new-list");
const backToListsButton = document.querySelector("#back-to-lists");

let lists = [];
let activeList = null;


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


newListForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const listName = listNameInput.value.trim();
    const listDeadline = listDeadlineInput.value;

    if (listName === "") {
        return;
    }

    const listCard = document.createElement("button");

    listCard.classList.add("list-card");

    listCard.textContent = listName;

    listContainer.appendChild(listCard);

    listCard.addEventListener("click", () => {
        currentList.textContent = listName;
        showTaskView();
    });

    emptyListMessage.style.display = "none";

    listNameInput.value = "";
    listDeadlineInput.value = "";

    showListView();

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