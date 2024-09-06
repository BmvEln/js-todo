import { createTask, deleteTask, getTasksList, updateTask } from "./server.mjs";

const todoForm = document.querySelector(".Todo-Form");
const todoInput = document.querySelector(".Todo-Input");
const todoList = document.querySelector(".Todo-List");

// Функция для создания нового элемента задачи
export function createTaskEl(task) {
  const listItem = document.createElement("li");
  listItem.dataset.id = task.id;

  const divLeftContainer = document.createElement("div");
  listItem.append(divLeftContainer);

  const taskText = document.createElement("span");
  taskText.textContent = task.title;
  divLeftContainer.append(taskText);

  // Создаем input для будущего редактирования задачи
  const input = document.createElement("input");
  input.type = "text";
  input.id = `input-${task.id}`;
  input.style.display = "none";
  input.classList.add("Todo-EditInput");
  divLeftContainer.append(input);

  // Можно сделать функцией -- createCheckbox
  const checkbox = createCheckbox(task, taskText);
  divLeftContainer.prepend(checkbox);

  const divRightContainer = document.createElement("div");
  divRightContainer.classList.add("Todo-Btns");
  listItem.append(divRightContainer);

  const deleteButton = createDeleteButton(task, listItem);
  divRightContainer.append(deleteButton);

  const editButton = createEditButton(task, taskText, input, listItem);
  divRightContainer.appendChild(editButton);

  return listItem;
}

function createCheckbox(task, taskText) {
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.style.marginRight = "8px";
  checkbox.checked = task.completed;

  // Устанавливаем стили для завершенной задачи
  if (task.completed) {
    taskText.style.textDecoration = "line-through";
  }

  // Обработка изменения чекбокса
  checkbox.addEventListener("change", function () {
    task.completed = this.checked;
    taskText.style.textDecoration = task.completed ? "line-through" : "none";
    updateTask(task.id, task);
  });

  return checkbox;
}

function createDeleteButton(task, listItem) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  // Событие удаления задачи
  deleteButton.addEventListener("click", async function () {
    await deleteTask(task.id);
    listItem.remove(); // Удалить элемент из DOM
  });

  return deleteButton;
}

function createEditButton(task, taskText, input, listItem) {
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";

  editButton.addEventListener("click", function () {
    const isEditing = listItem.classList.contains("editing");

    // Если есть класс editing, значит задача редактировалась и нужно убрать этот класс
    if (isEditing) {
      task.title = input.value;
      taskText.textContent = task.title;
      input.style.display = "none";
      taskText.style.display = "inline";
      listItem.classList.remove("editing");
      editButton.textContent = "Edit";
      updateTask(task.id, task);
    } else {
      input.value = task.title;
      taskText.style.display = "none";
      input.style.display = "inline";
      listItem.classList.add("editing");
      editButton.textContent = "Save";
    }
  });

  return editButton;
}

// Обработка отправки формы
todoForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const newTask = {
    title: todoInput.value,
    completed: false,
  };

  if (newTask.title.trim() === "") {
    alert("Enter a task!");
    return;
  }

  await createTask(newTask);
  todoInput.value = "";
  loadTasks(); // Загрузка задач после добавления новой
});

// Загрузка задач и отображение их в списке
async function loadTasks() {
  todoList.innerHTML = ""; // Очистить существующий список
  const tasks = await getTasksList();
  tasks.forEach((task) => {
    todoList.append(createTaskEl(task));
  });
}

// Изначальная загрузка задач
loadTasks();
