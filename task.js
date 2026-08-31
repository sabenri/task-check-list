const listView = document.querySelector("#list-view");
const taskView = document.querySelector("#tasks-view");
const newListView = document.querySelector("#new-list-view");

const openNewListButton = document.querySelector("#open-new-list");
const cancelNewListButton = document.querySelector("#cancel-new-list");
const backToListsButton = document.querySelector("#back-to-lists");


function showListView() {
    listView.classList.remove("view-hidden");
    taskView.classList.add("view-hidden");
    newListView.classList.add("view-hidden");
}

function showNewListView(){
    listView.classList.add("view-hidden");
    taskView.classList.add("view-hidden");
    newListView.classList.remove("view-hidden");
}

openNewListButton.addEventListener("click",() => {
    showNewListView();
});

cancelNewListButton.addEventListener("click", () => {
    showListView();
});

backToListsButton.addEventListener("click", () => {
    showListView();
});