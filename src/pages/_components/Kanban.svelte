<script>
    import {onMount} from 'svelte';
    export let _id;
    export let title;
    export let cols;
    export let data;
    let draggable;
    let kanban;
    let items;
    draggable = null;
const drop = (e)=>{
  e.preventDefault();
  let {target} = e;
  if(draggable===target)return;
  items = [...document.querySelectorAll("li")];
  for(let i=0;i<items.length;i++){
    let el = items[i];
    if(el===draggable){
      console.log("After");
 target.parentNode.insertBefore(draggable,target.nextSibling)
      break;
    }
    if(el===target){
      console.log("Before");
      target.getAttribute("drag")?
        target.parentNode.insertBefore(draggable,target.nextSibling):
      target.parentNode.insertBefore(draggable,target);
      break;
    }
  };
   console.log('drop');
};
const dragEnd = (e)=>{
  console.log('dragEnd');
   draggable.classList.remove("dragging");
  [...listItems].forEach(e=>e.classList.remove("hover"));
};
const dragEnter = (e)=>{
  if(e.target!=draggable)
   e.target.classList.add("hover");
};
const dragLeave = (e)=>{
   if(e.target!=draggable)
   e.target.classList.remove("hover");
};
const dragStart = (e)=>{
  draggable = e.target;
  draggable.classList.add("dragging");
  console.log('dragStart');
};
let listItems;
onMount(()=>{
    listItems = document.querySelectorAll("li");
  [...listItems].forEach(e=>{
    console.log(e.getAttribute('drag'))
  e.draggable = e.getAttribute('drag')?false:true;
  e.addEventListener("drop",drop);
  e.addEventListener("dragstart",dragStart);
  e.addEventListener("dragend",dragEnd);
  e.addEventListener("dragover",(e)=>e.preventDefault());
  e.addEventListener("dragenter",dragEnter);
  e.addEventListener("dragleave",dragLeave);
  [...document.querySelectorAll("button")].forEach(button=>{
    button.addEventListener("drop",(e)=>e.stopPropagation());
    button.addEventListener("dragover",(e)=>e.stopPropagation());
    button.addEventListener("dragenter",(e)=>e.stopPropagation());

  })
})

});
    let rows = Array(cols.cols.length).fill(2);
    const addItem=(i,button)=>{
        let element = document.createElement("li");
        element.draggable = true;

        element.style=`list-style:none;border:2px solid gray;padding:0.4rem;height:fit-content;min-height:75px;position:relative;`;
        element.addEventListener("drop",drop);
        element.addEventListener("dragstart",dragStart);
        element.addEventListener("dragend",dragEnd);
        element.addEventListener("dragover",(e)=>e.preventDefault());
        element.addEventListener("dragenter",dragEnter);
        element.addEventListener("dragleave",dragLeave);
        let buttonEdit =  document.createElement("button");
        buttonEdit.style = "position:absolute;top:0;left:100%;transform:translateX(-100%);font-size:0.5rem;"
        buttonEdit.addEventListener("drop",(e)=>e.stopPropagation());
        buttonEdit.addEventListener("dragover",(e)=>e.stopPropagation());
        buttonEdit.addEventListener("dragenter",(e)=>e.stopPropagation());
        buttonEdit.innerText = "Add";
        buttonEdit.addEventListener("click",(e)=>{
            let item = document.createElement("div");
            item.innerHTML = `
                <div style='display:flex;flex-direction:row;gap:1rem;align-items:center;'><input type="checkbox" style='height:1rem' /> <div contenteditable style='height:2rem'>Item</div></div>
            `;
            element.appendChild(item);

        })
        element.appendChild(buttonEdit);
        kanban.children[i].appendChild(element);
       // kanban.insertBefore(element,kanban.nextSi)
    }
    let colStyle = (function(){
        let ret = '';
        for(let i in cols.cols){
            ret+="1fr ";
        }
        let rowsret = '0.3fr ';
        for(let i =1;i<rows;i++){
            rowsret+="1fr ";
        }
        return "grid-template-columns: "+ret.substring(0,ret.length-1)+";grid-template-rows: "+rowsret.substring(0,rowsret.length-1)+";transform:scale(80%);";
    })();
    console.log(colStyle);
</script>
{_id} {title}
<div bind:this={kanban} class='kanban' style={colStyle} >
   {#each cols.cols as col,i}
   <div>
    <li drag=true style='text-align:center;font-size:2rem;border-bottom:2px solid black'><button ondrop={(e)=>e.preventDefault()} on:mousedown={()=>addItem(i)}>add item</button>{col}</li>






    </div>
   {/each}

   {#each cols.cols as col,i}

   {/each}
</div>

<style>
    li{
        list-style:none;
    }
    .kanban{
        display:grid;
        border:1px solid black;
    }
    button{
        transform:translateY(-100%);
        font-size:0.6rem;
        cursor:pointer;
        max-height:1.4rem;
        padding:0;
        opacity:0.5;
    }
    li:not([drag=true]){
        border:2px solid red;
    }
</style>
