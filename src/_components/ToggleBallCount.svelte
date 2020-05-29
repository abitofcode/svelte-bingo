<script>
    export let numberOfBallsToShow = 5;
    let chosenOption = 1;
</script>

<button disabled={chosenOption === 1} on:click={() => {chosenOption=1; numberOfBallsToShow = 5;}}>Show 5</button>
<button disabled={chosenOption === 2} on:click={() => {chosenOption=2; numberOfBallsToShow = 90;}}>Show All</button>