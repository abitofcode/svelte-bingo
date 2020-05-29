<script>
  import { calledList, call, initialisePool } from "../bingo-store";

  import ToggleBallCount from "./ToggleBallCount.svelte";
  import BingoBall from "./BingoBall.svelte";
  import BingoCallPhrase from "./BingoCallPhrase.svelte";
  import BingoButton from "./BingoButton.svelte";
  import BingoCard from "./BingoCard.svelte";

  let players = [{ name: "fred" }, { name: "chris" }, { name: "sue" }];
  let numberOfBallsToShow;
  let gameSeed;
  let callSeed;
  let playerMode = true;

  // $: initialisePool(callSeed);
  $: {
    gameSeed, initialisePool(callSeed);
  }

  //   $: console.log($calledList)
</script>

<main>
  <ToggleBallCount bind:numberOfBallsToShow />
  <h3>Bingo</h3>

  <div>
    Game:
    <input bind:value={gameSeed} />
  </div>

  <div>
    Call seed:
    <input bind:value={callSeed} />
  </div>

  {#if $calledList.length > 0}
    <div>
      <BingoCallPhrase ballText={$calledList[0]} />
      <BingoBall text={$calledList[0]} />
    </div>
  {/if}

  <BingoButton on:click={() => call()} />
  <!-- <button on:click={() => call()}>Call number</button> -->

  <div>
    {#each $calledList as bingotext, idx (bingotext)}
      {#if idx < numberOfBallsToShow}
        <BingoBall text={bingotext} />
      {/if}
    {/each}
  </div>

  {#each players as player}
    <h3>{player.name}</h3>
    <BingoCard called={$calledList} cardSeed={gameSeed + player.name} />
  {/each}
</main>
