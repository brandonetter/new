<script>
    import { goto } from '@roxi/routify'
    import {marked} from "marked";
    import {notify,notifyMessage} from './../../stores';
    let username = '';
    let showForm = false;
    let title;
    let numCols = 3;
    let div = document.createElement("div");
    let columnNames = new Array(7).fill("Column Name");
    const auth=async()=>{
        let response = await fetch("/api/auth/verify");
        response = await response.json();
        console.log(response)
        if(response?.user){
            username = response.user;
            return;
        }else{
            $goto("/login");
        }
    };
    const saveKanban=async()=>{
        try{
        let response = await fetch("/api/kanban",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({name:title.innerText,cols:columnNames.slice(0,numCols)})
        });
        response = await response.json();
        if(response.id){
            $notifyMessage = "Kanban '"+title.innerText+"' Created";
            $notify="success";
        }else{
            $notifyMessage = "Failure";
            $notify="failure";
        }
    }catch{
        $notifyMessage = "Failure";
            $notify="failure";
    }
    }
    const markdown = (e,c) =>{
        if(e.key=="Enter"){
            e.preventDefault();
            columnNames[c] = marked.parse(columnNames[c]);

        }
    }
    $:{

        columnNames.forEach((element,i) => {
            div.innerHTML = element;
            columnNames[i] = div.innerText;

            // element = "a";
        });
    }
    </script>
    {#await auth()}
    {:then}
    <main>
        <button on:mousedown={()=>showForm=!showForm}>New Kanban</button>
        {#if showForm}
        <div class='titleBar'>
            <h2 bind:this={title} contenteditable>Kanban Title</h2>
            <i> ✎</i>
        </div>
        <div class='sizeBar'>
            <span>Number of Columns: </span>
            <input bind:value={numCols} type='range' increment=1 max=7 min=1/>
        </div>
        <div class='columnHolder'>
        {#each Array(numCols) as _,i}
        <div class='col'>
            <span class='columnName' bind:innerHTML={columnNames[i]}  contenteditable>{columnNames[i]}</span>
        </div>
        {/each}
        </div>
        <button on:mousedown={saveKanban}>Save</button>
            {/if}
    </main>


    {/await}
    <style>
        main{
            position:relative;
            padding:1rem;
            left:50vw;
            transform:translateX(-50%);
            width:80vw;
            height:fit-content;
            border-radius:15px;
            border:2px solid #44444444;
        }
        .titleBar{
            display:flex;
            flex-direction:row;
            width:100%;
            align-items:center;
        }
        .col{
            border:1px solid black;
            width:100%;
            text-align:center;
            min-width:fit-content;

            height:25vh;
        }
        .columnHolder{
            display:flex;
            flex-direction:row;
            width:70vw;

        }
        .columnName{
            padding-left:1.2rem;
            padding-right:1.2rem;
            font-weight:600;
            font-size:1.4rem;
            border-bottom:1px solid black;
        }
    </style>
