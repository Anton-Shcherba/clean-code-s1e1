const addTask = document.querySelector('.task_added');
const completedLits = document.querySelector('.completed');
const todoLits = document.querySelector('.todo');

function edit() {
  const task = this.parentNode;
  task.classList.toggle('task_editable');
  task.children[1].innerText = task.children[2].value;
  this.innerText === 'Edit' ? this.innerText = 'Save' : this.innerText = 'Edit';
}

function remove() {
  this.parentNode.remove();
}

function completed() {
  this.checked ? completedLits.append(this.parentNode) : todoLits.append(this.parentNode);
}

addTask.children[1].onclick = () => {
  const addInput = addTask.children[0];
  if(addInput.value) {
    const task = addTask.cloneNode(true);
    task.classList.remove('task_added', 'task_editable');

    const label = document.createElement("label");
    label.innerText = addInput.value;
    label.classList.add('task__label');

    addInput.value = '';

    const checkBox = document.createElement('input');
    checkBox.type="checkbox";
    checkBox.classList.add('task__checkbox');
    checkBox.onclick = completed;

    const editBtn = task.children[1];
    editBtn.innerText = 'Edit';
    editBtn.onclick = edit;

    const delBtn = document.createElement("button");
    delBtn.classList.add('task__btn');
    const delImg = document.createElement("img");
    delImg.classList.add("task__img");
    delImg.src='./remove.svg';
    delBtn.append(delImg);
    delBtn.onclick = remove;

    task.prepend(label);
    task.prepend(checkBox);
    task.append(delBtn);
    todoLits.append(task);
  }
};

for (const list of [todoLits, completedLits]) [...list.children].forEach(task => {
  task.children[0].onclick = completed;
  task.children[3].onclick = edit;
  task.children[4].onclick = remove;
});