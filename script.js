document.addEventListener(
"DOMContentLoaded",
()=>{


const input =
document.getElementById("task-input");


const form =
document.querySelector(".input-area");


const list =
document.getElementById("task-list");


const count =
document.getElementById("task-count");


const clear =
document.getElementById("clear-btn");


const empty =
document.querySelector(".empty");


let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];


let filter="all";



function save(){

localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);

}



function render(){


list.innerHTML="";


let filtered =
tasks.filter(task=>{

if(filter==="active")
return !task.completed;


if(filter==="completed")
return task.completed;


return true;


});



filtered.forEach(task=>{


let li=document.createElement("li");


if(task.completed)
li.classList.add("completed");



li.innerHTML=`

<input 
type="checkbox"
class="checkbox"
${task.completed?"checked":""}>


<span class="task-text">
${task.text}
</span>


<div class="actions">

<button class="edit">
<i class="fa-solid fa-pen"></i>
</button>


<button class="delete">
<i class="fa-solid fa-trash"></i>
</button>


</div>

`;



li.querySelector(".checkbox")
.addEventListener("change",()=>{


task.completed =
!task.completed;


save();

render();


});



li.querySelector(".delete")
.onclick=()=>{


tasks =
tasks.filter(t=>t.id!==task.id);


save();

render();


};



li.querySelector(".edit")
.onclick=()=>{


let newText =
prompt(
"Edit task:",
task.text
);


if(newText){

task.text=newText.trim();

save();

render();

}


};



list.appendChild(li);



});



count.textContent =
`${tasks.length} Tasks`;



empty.style.display =
filtered.length===0?
"block":
"none";


}




form.addEventListener(
"submit",
e=>{


e.preventDefault();


let text =
input.value.trim();



if(!text)
return;



tasks.push({

id:Date.now(),

text,

completed:false

});


save();

render();


input.value="";


});




clear.onclick=()=>{


tasks =
tasks.filter(
task=>!task.completed
);


save();

render();


};





document.querySelectorAll(".filter-btn")
.forEach(btn=>{


btn.onclick=()=>{


document.querySelectorAll(".filter-btn")
.forEach(b=>
b.classList.remove("active")
);


btn.classList.add("active");


filter=
btn.dataset.filter;


render();


};


});



render();


});