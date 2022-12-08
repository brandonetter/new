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

    const checkUsername = () =>{
        usernameValid = false;
        if(usernameValue.match(/^[a-zA-Z]{6,}$/)){
            usernameValid = true;
        }
    }
    const checkPass = ()=>{
        passwordValid = false;
        passwordIsLong = false;
        passwordHasNumber = false;
        if(passwordValue.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)){
            passwordValid = true;
        }
        if(passwordValue === '') passwordValid = null;

        if(passwordValue.length>=6) passwordIsLong=true;
        if(passwordValue.match(/[0-9]/)) passwordHasNumber = true;
    }
    $:{
        passwordValue += '';
        usernameValue += '';
        checkUsername();
        checkPass();


    }

    const submit =async(e)=>{
        if(e.key && e.key!="Enter") return;
        if(!usernameValid || !passwordValid) return;

        response = await fetch("/api/auth/",{
            method:"POST",
            mode: 'cors',
            headers:{"content-type":"application/json"},
            body:JSON.stringify({username:usernameValue,password:passwordValue}),
        });
        response = await response.json();
        if(response.code === "success"){
            $notify = response.code;
            $notifyMessage = "Successfully Registered!"
            $goto("/login");
        }
        if(response.code ==="failure"){
            $notify = response.code;
            $notifyMessage = "Error Registering";
        }
    }

</script>
{#if response?.auth == true}
{JSON.stringify(response)}
{:else}
{/if}
<main>
<div class='registerForm'>
<label for='username'>Username</label>
<input id='username' name='username' on:keydown={submit} bind:value={usernameValue} placeholder='Username'/>
{#if usernameValue.length}


<span class={usernameValid?'passwordSuccess':'passwordAlert'}>Username must be:<br>
    {#if usernameValue.length>=6}
    <b style='color:#88EE88'>☑ At least 6 characters long</b>
    {:else}
    <b>☒ At least 6 characters long</b>
    {/if}
    <br>
    {#if usernameValid}
    <b style='color:#88EE88'>☑ Include only letters</b>
    {:else}
    <b>☒ Include only letters</b>
    {/if}

</span>

{/if}
<label for='password'>Password</label>
<input id='password' name='password' on:keydown={submit} bind:value={passwordValue} placeholder='Password' type='password'/>
{#if passwordValue.length}
<span class={passwordValid?'passwordSuccess':'passwordAlert'}>Password must be:<br>
    {#if passwordIsLong}
    <b style='color:#88EE88'>☑ 6 characters long</b>
    {:else}
    <b>☒ 6 characters long</b>
    {/if}
    <br>
    {#if passwordHasNumber}
    <b style='color:#88EE88'>☑ Include at least one number</b>
    {:else}
    <b>☒ Include at least one number</b>
    {/if}

</span>
{/if}
<button disabled={!usernameValid||!passwordValid} on:mousedown={submit}>Submit</button>
</div>

<a href='/login'>Login</a>
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
      font-size:1.2rem;
      transform:translateX(-50%);
    }
    .passwordAlert{
        color:#EE7777;
    }
    .passwordSuccess{
        color:#99EE99;
    }
    .registerForm>*>b{
        font-weight:500;
    }
    button{
        margin-top:1rem;
        cursor:pointer;
    }
</style>
