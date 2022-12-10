<script>
    import {onMount} from 'svelte';
    export let _id;
    export let title;
    export let cols;
    export let data;
    export let save;
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
  kanbanCalc();
};
const kanbanCalc =  (element=kanban,ob = {}) =>{
    let listItems = kanban.querySelectorAll("li");
    let arr = [];
    [...listItems].forEach(element=>{ 0,1
        let checks = [];
        let possibleChecks = element?.children;
        for(let check in [...possibleChecks]){
            if(possibleChecks[check]?.children[0]?.checked != undefined) checks.push(possibleChecks[check]?.children[0]?.checked);
        }

        arr.push({el:element.innerText,...(checks.length && {checkbox:checks})});
    });
    save({id:_id,cols:cols.cols,data:arr});

}
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

  });


})
let datum = cols.data;
  console.log(datum);
  let _current = 0;
  if(Object.keys(datum).length){
  for(let i of datum){
    if(i.el.startsWith("add item")){
        let curCol = i.el.split("add item");
        _current = cols.cols.indexOf(curCol[1]);
    }
    if(i.el.startsWith("Add\n")){
        let items = i.el.split("Add\n");
        let allItems = items[1].split("\n");
        let itemArray = [];
        for(let index in allItems){
            itemArray.push([allItems[index],i?.checkbox[index]]);

        }
            addItem(_current,null,itemArray);

    }
  }
}
});
    let rows = Array(cols.cols.length).fill(2);
    const addItem=(i,button,itemArray)=>{
        let element = document.createElement("li");
        console.log(i);
        element.draggable = true;

        element.style=`list-style:none;border:2px solid gray;width:14rem;padding:0.4rem;height:fit-content;min-height:75px;position:relative;`;
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
            let checked='checked';
            let checkBox = document.createElement("input");
            checkBox.setAttribute("type","checkbox");
            let text = document.createElement("div");
            text.setAttribute("contenteditable","true");
            text.innerText = "New Item";
            text.style.display = "inline";
            text.style.position = "relative";
            item.style.width='11rem';

            item.style.overflowWrap='anywhere';
            item.style.wordBreak = 'break-all';
            item.style.margin='1rem';
            item.style.border = "1px solid #22222212";
            item.style.borderRadius='2px';
            item.style.padding = "0.5rem";
            item.style.display = "flex";

            item.appendChild(checkBox);
            item.appendChild(text);
            element.appendChild(item);
            item.addEventListener("keydown",(e)=>{
                if(e.key==="Enter"){
                    document.activeElement.blur();
                }
            });
            checkBox.addEventListener("change",()=>{
                !checkBox.checked?
                (text.style.opacity = 1,text.style.textDecoration='none'):
                (text.style.opacity = 0.5,text.style.textDecoration='line-through');
            });
            item.addEventListener("drop",(e)=>e.preventDefault());
            item.addEventListener("dragover",(e)=>e.stopPropagation());
            item.addEventListener("dragenter",(e)=>e.stopPropagation());
            checkBox.addEventListener("drop",(e)=>e.preventDefault());
            checkBox.addEventListener("dragover",(e)=>e.stopPropagation());
            checkBox.addEventListener("dragenter",(e)=>e.stopPropagation());

        })
        element.appendChild(buttonEdit);
        if(itemArray){
            for(let items of itemArray){
            let item = document.createElement("div");
            let checked='checked';
            let checkBox = document.createElement("input");
            checkBox.setAttribute("type","checkbox");
            let text = document.createElement("div");
            text.setAttribute("contenteditable","true");
            text.innerText = items[0];
            text.style.display = "inline";
            text.style.position = "relative";
            item.style.width='11rem';

            item.style.overflowWrap='anywhere';
            item.style.wordBreak = 'break-all';
            item.style.margin='1rem';
            item.style.border = "1px solid #22222212";
            item.style.borderRadius='2px';
            item.style.padding = "0.5rem";
            item.style.display = "flex";

            item.appendChild(checkBox);
            item.appendChild(text);
            element.appendChild(item);
            item.addEventListener("keydown",(e)=>{
                if(e.key==="Enter"){
                    document.activeElement.blur();
                }
            });
            checkBox.addEventListener("change",()=>{
                !checkBox.checked?
                (text.style.opacity = 1,text.style.textDecoration='none'):
                (text.style.opacity = 0.5,text.style.textDecoration='line-through');
            });
            checkBox.checked = items[1];
            item.addEventListener("drop",(e)=>e.preventDefault());
            item.addEventListener("dragover",(e)=>e.stopPropagation());
            item.addEventListener("dragenter",(e)=>e.stopPropagation());
            checkBox.addEventListener("drop",(e)=>e.preventDefault());
            checkBox.addEventListener("dragover",(e)=>e.stopPropagation());
            checkBox.addEventListener("dragenter",(e)=>e.stopPropagation());
            element.appendChild(item);
        }
    }
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
        return "grid-template-columns: "+ret.substring(0,ret.length-1)+";grid-template-rows: "+rowsret.substring(0,rowsret.length-1)+";";
    })();
    console.log(colStyle);
</script>
{_id} {title}
<div bind:this={kanban} class='kanban' style={colStyle} >
   {#each cols.cols as col,i}
   <div style='display:flex;flex-direction:column;align-items:center;gap:0.3rem;'>
    <li drag=true style='text-align:center;font-size:2rem;border-bottom:2px solid black;'><button ondrop={(e)=>e.preventDefault()} on:mousedown={()=>addItem(i)}>add item</button>{col}</li>






    </div>
   {/each}


</div>
<button style='transform:translateY(-150%)' on:click={kanbanCalc}>Save</button>

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
    :global(input){
        min-width:20px;
        min-height:20px;
        margin-right:1rem;
    }
    :global(div){
        background-color:gray;
    }
    :global(div>li){
        background-color:#6A6A6A;
        border-radius:0.4rem;
        padding:1rem;
    }
    :global(div>li>div){
        background-color:gray;
    }

</style>
