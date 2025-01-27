const localStorageKey = "to-do-list-gn";

// permite a interaçao com a tecla Enter
document
  .getElementById("input-new-task")
  .addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      newTask();
    }
  });

function validadeIfExistsNewTask() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let inputValue = document.getElementById("input-new-task").value;
  let existe = values.find((x) => x.name == inputValue);
  return !existe ? false : true;
}

function newTask() {
  let input = document.getElementById("input-new-task");
  input.style.border = "";
  //validação
  if (!input.value.trim()) {
    input.style.border = "1px solid red";
    alert("Nao tem nada");
  } else if (validadeIfExistsNewTask()) {
    alert("Ja existe uma task com essa descrição");
  } else {
    // colocando no localstorage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    values.push({
      name: input.value,
    });
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
  }
  input.value = ""; // apagar o texto que ja foi digitado
}

function showValues() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let list = document.getElementById("to-do-list");

  list.innerHTML = "";

  //mudei innerHTML por createElement para evitar problemas
  values.forEach((task) => {
    let listItem = document.createElement("li");
    listItem.innerText = task.name;

    let removeButton = document.createElement("button");
    removeButton.innerHTML = "ok";
    removeButton.id = "btn-ok";

    removeButton.onclick = () => {
      removeItem(task.name);
    };

    listItem.appendChild(removeButton);
    list.appendChild(listItem);
  });
}

function removeItem(data) {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let index = values.findIndex((x) => x.name == data);
  values.splice(index, 1); //remove elementos de um array
  localStorage.setItem(localStorageKey, JSON.stringify(values));
  showValues();
}

showValues();
