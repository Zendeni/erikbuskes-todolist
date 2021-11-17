const baseUrl = 'http://localhost:3000';

const postAPI = async data => {
try { 
    const response = await fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });   response.json();
      } catch(error) {
        console.log(error)
        return json;
}
};

const readAPI = async () => {
  await fetch(baseUrl, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('no connection');
      }
      return response.json();
    })
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        var list = document.querySelector('#todoList');
        var listItem = document.createElement('li');
        var todoTask = document.createElement('label');
        var icon = document.createElement('i');
        var icon2 = document.createElement('i');

        list.appendChild(listItem);
        listItem.appendChild(todoTask);
        listItem.setAttribute('id', data[i]._id);
        todoTask.setAttribute('class', 'todos');
        todoTask.setAttribute('for', data[i].description);
        todoTask.textContent = data[i].description;
        icon.className = 'fas fa-trash-alt';
        icon2.className = 'far fa-check-circle';
        listItem
        .insertBefore(icon2, listItem.firstElementChild.nextSibling)
        .insertBefore(icon, listItem.nextSibling)
        .setAttribute('id', `${data[i]._id}`);
        
        icon2.addEventListener('click', () => {
          updateAPI(data[i]._id)
        });
        icon.addEventListener('click', () => {
          deleteAPI(data[i]._id)
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

const updateAPI = () => {
  fetch(baseUrl/_id, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify()
   })
   .then(document.icon2.style.color = "red");
   response.json();
};

function deleteAPI(data) {
  fetch(`${baseUrl}/${data}`, {
    method: 'DELETE',
  });
  window.location.reload();
}

const dataToDOM = () => {
  let valueInputField = document.querySelector('#inputField').value;
  postAPI({ description: valueInputField, done: false });
  document.querySelector('#inputField').value = '';

  window.location.reload();
};

document.querySelector('#addTask').addEventListener('click', dataToDOM);
document.querySelector('#inputField').addEventListener('keyup', event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    dataToDOM();
  }
});

readAPI();