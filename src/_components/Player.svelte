<script>
  import BingoCard from "./BingoCard.svelte";

  let gameSeed = "";
  let playerName = "";
</script>

<style>

</style>

<main>
  <h3>Bingo</h3>

  <div>
    Game:
    <input bind:value={gameSeed} />
  </div>

  <div>
    Player name:
    <input bind:value={playerName} />
  </div>

  <h3>{playerName}</h3>
  <BingoCard cardSeed={gameSeed + playerName} />

</main>
