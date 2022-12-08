
<!-- routify:options preload="proximity" -->
<script>
      import {notify,notifyMessage} from '../stores.js';
      $:if($notify){
        setTimeout(()=>{
            $notify = undefined
        },2700)
      }

    </script>
<div class='notify {$notify?$notify:''}'>
   {$notifyMessage}
</div>
<br><br><br>
<slot />

<style>
    .notify{
        z-index:10;
        position:absolute;
        font-size:2.2rem;
        text-align:center;
        padding-top:0.5rem;
        left:50vw;
        height:3.4rem;
        top:-5rem;
        user-select:none;
        width:75vw;
        transform:translateX(-50%) translateY(-100%) scale(0.7);
        transition:all 1s ease;
        color:white;

    }
    .success{
        background-color:#88EE88;
        top:4rem;

    }
    .failure{
        top:4rem;
        background-color:#EE8888;
    }
    </style>
