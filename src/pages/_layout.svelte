
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
<slot />

<style>
    .notify{
        z-index:10;
        position:absolute;
        font-size:2.2rem;
        text-align:center;
        padding-top:1rem;
        left:50vw;
        height:5rem;
        top:-5rem;
        width:75vw;
        transform:translateX(-50%) translateY(-100%);
        transition:all 1s ease;
        color:white;

    }
    .success{
        background-color:#88EE88;
        top:10rem;

    }
    .failure{
        top:10rem;
        background-color:#EE8888;
    }
    </style>
