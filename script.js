//local strorage

let todoList = JSON.parse(localStorage.getItem('todos'));
if (!todoList) todoList = [];

document.getElementById('task-to-do').addEventListener('keypress', (e) => {
  if (e.keyCode == 13) addToList();
})

function displayATask(element, index) {
  let card = document.createElement('div');
  card.className = 'card';
  let p = document.createElement('p');
  p.className = "new-element";
  let text = document.createTextNode(element.value);
  if (element.isDone) {
    p.style.textDecoration = "line-through";
  }

  p.appendChild(text);
  card.appendChild(p);
  // console.log(card);


  //done

  if (!element.isDone) {
    let done = document.createElement('button');
    let mark_done = document.createElement('i');
    mark_done.className = 'fas fa-badge-check fa-lg';
    mark_done.id = "mark";
    done.appendChild(mark_done);
    done.id = 'mark-done';
    card.appendChild(done);

    done.addEventListener('click', function () {
      // console.log(text);
      // p.style.textDecoration = "line-through";
      element.isDone = true;
      // task.removeChild(card);
      // task.appendChild(card);
      todoList.splice(index, 1);
      todoList.push(element);
      saveAndUpdateData();

    });

    //EDIT BUTTON

    let edit = document.createElement('button');
    let edit_it = document.createElement('i');
    edit_it.className = 'fal fa-edit fa-lg';
    edit.appendChild(edit_it);
    edit.id = 'edit-btn';
    card.appendChild(edit);
    edit.addEventListener('click', function () {
      editTasks(element, index, card, text);
    })
  }

  //Remove Button
  let remove_btn = document.createElement('button');
  let icon = document.createElement('i');
  icon.className = 'fa-solid fa-trash-can fa-lg   ';
  remove_btn.appendChild(icon);
  remove_btn.className = "remove-btn";
  card.appendChild(remove_btn);
  remove_btn.addEventListener('click', function () {
    todoList.splice(index, 1);
    saveAndUpdateData();
  });

  task.appendChild(card);

}

function displayTodos() {

  let task = document.getElementById('task');
  task.innerHTML = "";
  todoList.forEach((element, index) => {
    displayATask(element, index);
  });
}

function addToList() {
  document.getElementById('error').innerHTML = "";
  let input = document.getElementById('task-to-do').value;
  if (!input) {
    document.getElementById('error').innerHTML = "Please add some task";
    return;
  }

  let elem = {
    value: input,
    isDone: false
  };

  todoList.unshift(elem);
  saveAndUpdateData();
}

function editTasks(element, index, card, text) {
  let card1 = document.createElement('div');
  card1.className = 'card';
  let take_input = document.createElement('input');
  take_input.type = 'text';
  take_input.id = "take_input";
  take_input.value = text.nodeValue;

  card1.appendChild(take_input)
  let Update = document.createElement('button');
  let text1 = document.createTextNode("Update")
  Update.appendChild(text1);
  Update.className = 'update';
  card1.appendChild(Update);

  let Cancel = document.createElement('button');
  let text2 = document.createTextNode("Cancel");
  Cancel.appendChild(text2);
  Cancel.className = 'Cancel';
  card1.appendChild(Cancel);

  task.replaceChild(card1, card);

  Update.addEventListener('click', function () {
    text.nodeValue = take_input.value;
    task.replaceChild(card, card1);
    element.value = take_input.value;
    saveAndUpdateData();
  })
  Cancel.addEventListener('click', function () {
    task.replaceChild(card, card1);
  })

}

function saveAndUpdateData() {
  localStorage.setItem('todos', JSON.stringify(todoList));
  displayTodos();
  document.getElementById('task-to-do').value = "";
}

displayTodos();
  