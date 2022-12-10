<script>
import { goto } from '@roxi/routify';
import MakeKanban from '../_components/MakeKanban.svelte';
import ShowKanbans from '../_components/ShowKanbans.svelte';
let username = '';
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
</script>
{#await auth()}
{:then}
<h1>Welcome {username}</h1>
<MakeKanban />
<ShowKanbans />
{/await}
