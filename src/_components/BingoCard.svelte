<script>
  import { fade } from "svelte/transition";

  // Simplified Bingo card.
  // Most of the generation has been migrated to bingostore.js
  // but is not yet used here.
  import seedrandom from "seedrandom";

  let cardNumbers = [];
  export let called = [];
  export let cardSeed;

  $: called.length === 0, (cardNumbers = initialiseCard(cardSeed));
  $: checkCard(called);

  // $: console.log("Called: " + called);

  let complete = false;

  function checkCard(numbersCalled) {
    // updated the flags in the card
    let test = [];
    test = cardNumbers.map(item => {
      if (numbersCalled.includes(item.value)) {
        called.toLocaleString(item);
        item.matched = true;
      }
      return item;
    });
    cardNumbers = test;
    complete = cardNumbers.filter(item => !item.matched).length === 0;
  }

  function initialiseCard(seed) {
    let maxNumber = 90;
    let pool = Array(maxNumber)
      .fill()
      .map((_, i) => i + 1);
    shuffleArray(pool, seed);
    pool = pool
      .filter((item, idx) => idx < 25)
      .map(item => {
        return {
          text: item.toString(),
          value: item,
          matched: false,
          selected: false
        };
      })
      .sort(function(a, b) {
        return a.value - b.value;
      });

    return pool;
  }

  function toggleSelected(idx) {
    cardNumbers[idx].selected = !cardNumbers[idx].selected;
  }

  // PRIVATE ////////////////////////////////////////////////////////////////////

  function shuffleArray(array, seed = null) {
    if (seed) {
      let rng = seedrandom(seed);
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    } else {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }
</script>

<style>
  .card {
    border: 5px solid lightgray;
    max-width: 520px;
  }

  .complete {
    border: 5px solid green;
    max-width: 520px;
  }

  @media only screen and (max-width: 600px) {
    .card {
      border: 5px solid lightgray;
      max-width: 260px;
    }

    .complete {
      border: 5px solid green;
      max-width: 260px;
    }
  }

  .card:after {
    content: "";
    display: table;
    clear: both;
  }

  .cell {
    float: left;
    position: relative;
    width: 50px;
    height: 50px;
    margin: 1px;
    cursor: default;
  }

  .cellText {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-size: 2rem;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    user-select: none;
  }

  .called {
    background-color: yellow;
    border-radius: 100px;
    color: black;
  }

  .selected {
    background-color: #ff3e00;
    color: white;
  }
</style>

<div class="card" class:complete>
  {#each cardNumbers as cell, i (i)}
    <span
      in:fade={{ duration: 300, delay: i * 30 }}
      class="cell"
      class:selected={cardNumbers[i].selected}
      class:called={cardNumbers[i].matched}
      on:click={e => toggleSelected(i)}>
      <span class="cellText">{cell.text}</span>
    </span>
  {/each}

</div>
