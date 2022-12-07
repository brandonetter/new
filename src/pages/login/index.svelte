<script>
    import { metatags } from '@roxi/routify'
    import {onMount} from 'svelte';
    import { goto } from '@roxi/routify'
    import {notify,notifyMessage} from './../../stores';

    let passwordValue = '';
    let usernameValue = '';
    let usernameValid = null;
    let passwordValid = null;

    let passwordIsLong = false;
    let passwordHasNumber = false;

    metatags.title = 'My Routify app'
    metatags.description = 'Description coming soon...'
    let response;



    const submit =async(e)=>{
        if(e.key && e.key!="Enter") return;

        response = await fetch("/api/auth/login",{
            method:"POST",
            mode: 'cors',
            headers:{"content-type":"application/json"},
            body:JSON.stringify({username:usernameValue,password:passwordValue}),
        });
        response = await response.json();
        if(response.code === "success"){
            $notify = response.code;
            $notifyMessage = "Successfully Logged In"
            console.log(response.token);
            $goto("/login");
        }
        if(response.code ==="failure"){
            $notify = response.code;
            $notifyMessage = "Error Logging In";
        }
    }

</script>
<main>
<div class='registerForm'>
<label for='username'>Username</label>
<input id='username' name='username' on:keydown={submit} bind:value={usernameValue} placeholder='Username'/>

<label for='password'>Password</label>
<input id='password' name='password' on:keydown={submit} bind:value={passwordValue} placeholder='Password' type='password'/>

<button on:mousedown={submit}>Login</button>
</div>
</main>
<style>

    .registerForm{
        padding:1rem;
        position:relative;
        left:50vw;
        transform:translateX(-50%);
        display:flex;
        flex-direction:column;
        width:30vw;
        min-width:400px;
        height:fit-content;
        border:3px solid #12121225;
        box-shadow:0px 0px 8px #12121225;
    }
    .registerForm>*{
      width:80%;
      position:relative;
      left:50%;
      transform:translateX(-50%);
    }
    .passwordAlert{
        color:red;
    }
    .passwordSuccess{
        color:green;
    }
    .registerForm>*>b{
        font-weight:500;
    }
</style>
