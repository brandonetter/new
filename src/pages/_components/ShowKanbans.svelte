<script>
    import { goto } from '@roxi/routify';
    import MakeKanban from '../_components/MakeKanban.svelte';
    import Kanban from '../_components/Kanban.svelte';
    let kanbans = [];
    let resArray = [];
    const auth=async()=>{
        let response = await fetch("/api/auth/verify");
        response = await response.json();
        console.log(response)
        if(response?.user){
            await getKanbans();
            return;
        }else{
            $goto("/login");
        }
    };
    $:{
        kanbans = resArray;
    }
    const getKanbans = async() =>{
        let response = await fetch("/api/kanban/");
        response = await response.json();
        resArray = [];
        for(let i in response){
            resArray.push({kanban:response[i]});
        }
        setTimeout(getKanbans,4000);
    }
    </script>
    {#await auth()}
    {:then}
    {#each kanbans as kanban}
    <Kanban _id={kanban.kanban.id} title={kanban.kanban.name} cols={JSON.parse(kanban.kanban.data)} />

    {/each}


    {/await}
