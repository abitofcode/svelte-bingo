import { writable } from "svelte/store";
// Random seed from a string
// http://davidbau.com/archives/2010/01/30/random_seeds_coded_hints_and_quintillions.html
import seedrandom from "seedrandom";

// Private
let bingoPool = [];

// EXPORTED ////////////////////////////////////////////////////////////////////

// Store
export const calledList = writable([]);


// Initialise the bingo pool. Can specify a seed string to generate a
// given sequence of random numbers.
export function initialisePool(seed = null) {
  let maxNumber = 90;
  let pool = Array(maxNumber)
    .fill()
    .map((_, i) => i + 1);
  shuffleArray(pool, seed);
  bingoPool = pool;
  // reset calledList
  calledList.set([]);

  // console.log("Resetting called List")
  
}

// Remove the last number from the randomised bingoPool and add it to the called list
export function call() {
  if (!bingoPool.length > 0) return;
  calledList.update((items) => {
    return [bingoPool.pop(), ...items];
  });
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
