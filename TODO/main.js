let form = document.getElementById("form");
let titel = document.getElementById("titel");
let verfasser = document.getElementById("verfasser");
let start = document.getElementById("startdateInput");
let end = document.getElementById("enddateInput");
let fortschritt = document.getElementById("fortschritt");
let dringend = document.getElementById("dringend");
let wichtig = document.getElementById("wichtig");
let beschreibung = document.getElementById("beschreibung");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let search = document.getElementById("search");
let suchen = document.getElementById("suche");
let reset = document.getElementById("reset");
let cancel = document.getElementById("cancel"); 

let saveindex = -1; 
console.log(saveindex);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

suchen.addEventListener("submit", (s) => {
  s.preventDefault();
  createTasks();
});

let formValidation = () => {
  if (titel.value === "") {
    console.log("failure");
    msg.innerHTML = "Füllen Sie bitte alle Felder aus!";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = JSON.parse(localStorage.getItem("data")) || [];

let acceptData = () => {
  const taskData = {
    titel: titel.value,
    verfasser: verfasser.value,
    startdateInput: start.value,
    enddateInput: end.value,
    dringend: dringend.checked,
    wichtig: wichtig.checked,
    beschreibung: beschreibung.value,
    fortschritt: fortschritt.value,
  };
console.log(saveindex);
  if (saveindex === -1) {
    data.push(taskData);
  } else {
    data[saveindex] = taskData;
    saveindex = -1;
  }

  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  let searchValue = search.value.toLowerCase();


  data.forEach((task, index) => {
    
    if (task.titel.toLowerCase().includes(searchValue)) {
      let change_color = '';
      if (task.dringend && task.wichtig) { 
        change_color = 'purple';
      } else if (task.dringend && !task.wichtig) { 
        change_color = 'red';
      } else if (!task.dringend && task.wichtig) { 
        change_color = 'yellow';
      } else {
        change_color = 'blank';
      }
      change_color = 'dot ' + change_color;
      console.log(change_color);
      showprogress();
      tasks.innerHTML += `
        <div id="${index}" class="task">
          <span class="fw-bold">${task.titel}</span>
          <span class="small">Start Datum: ${task.startdateInput} Verfasser: ${task.verfasser}</span>
          <span class="small">End Datum:   ${task.enddateInput} Fortschritt: ${task.fortschritt} %</span>
          <div class= "${change_color}"></div>
          <span class="options">
            <i onClick="editTask(${index})" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick="deleteTask(${index})" class="fas fa-trash-alt"></i>
          </span>
        </div>
      `;
    }
  });


  resetForm();
};

let resetsearch = (r) => {
  reset.click();
  createTasks();
};

let deleteTask = (index) => {
  data.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(data));
  createTasks();
  console.log(data);
};

let editTask = (index) => {
  let task = data[index];
  saveindex = index;
  console.log(saveindex);

  titel.value = task.titel;
  verfasser.value = task.verfasser;
  start.value = task.startdateInput;
  end.value = task.enddateInput;
  fortschritt.value = task.fortschritt;
  dringend.checked = task.dringend;
  wichtig.checked = task.wichtig;
  beschreibung.value = task.beschreibung;

  
  showprogress();
};

let resetForm = () => {
  titel.value = "";
  verfasser.value = "";
  start.value = "";
  end.value = "";
  fortschritt.value = 0;
  dringend.checked = false;
  wichtig.checked = false;
  beschreibung.value = "";
  saveindex = -1;
};

cancel.addEventListener('click', resetForm);

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createTasks();
})();

function showprogress() {
  let progress = document.getElementById("fortschritt");
  let progressValue = document.getElementById("lbl");
  progressValue.innerHTML = progress.value + "%";
}

document.getElementById("fortschritt").addEventListener("input", showprogress);
document.addEventListener("DOMContentLoaded", showprogress);







































































































//Danke an Stack Overflow und W3Schools für die Hilfe wärend ich am Verzweifeln war.