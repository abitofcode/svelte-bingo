<script>
  import { scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  export let text = "";
</script>

<style>
  .bingoBall {
    display: inline-block;
    position: relative;
    background-color: yellow;
    width: 50px;
    height: 50px;
    border-radius: 100px;
    margin: 0.5rem;
  }

  .bingoText {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-size: 2rem;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }
</style>

<span in:scale="{{duration: 300, delay: 0, opacity: 0.5, start: 2.5, easing: quintOut}}" class="bingoBall">
  <span class="bingoText">{text}</span>
</span>
