<script>
    import { metatags } from '@roxi/routify'
    import {onMount} from 'svelte';
    import {password} from './../stores.js'
    let passwordValue;
    password.subscribe(value => {
		passwordValue = value ||'';
	});
    metatags.title = 'My Routify app'
    metatags.description = 'Description coming soon...'
    let response;
    onMount(async ()=>{
        response = await fetch("/api/auth/",{
            method:"POST",
            mode: 'cors',
            headers:{"content-type":"application/json"},
            body:JSON.stringify({password:passwordValue}),
        });
        response = await response.json();

    });
    const checkPass = ()=>{
        (async ()=>{
        response = await fetch("/api/auth/",{
            method:"POST",
            mode: 'cors',
            headers:{"content-type":"application/json"},
            body:JSON.stringify({password:passwordValue}),
        });
        response = await response.json();

    })();
    }
    $:{
        passwordValue += '';
        checkPass();
    }



</script>
{#if response?.auth == true}
{JSON.stringify(response)}
{:else}
No
{/if}
<input bind:value={passwordValue}/>
