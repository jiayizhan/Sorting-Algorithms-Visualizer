import * as sort from "./index";

function getArr() {
  const a = [];
  for (let i = 0; i < 10000; ++i) a.push(Math.floor(Math.random() * 1001));
  return a;
}

function testSort(sortName, algo) {
  let i, j;
  console.log(sortName);
  for (i = 1; i <= 50; ++i) {
    const arr = getArr();

    const a = algo(arr);
    const b = arr.sort((a, b) => a - b);
    let passed = true;

    for (j = 0; j < arr.length; ++j)
      if (a[j] != b[j]) {
        passed = false;
        break;
      }

    if (passed) console.log(`test ${i} passed`);
    else {
      console.error(`test ${i} not passed`);
      return false;
    }
  }

  return true;
}

export default function test() {
  // testSort("bubble", sort.bubblesort);
  // testSort("select", sort.selectionsort);
  // testSort("merge", sort.mergesort);
  // testSort("quick", sort.quicksort);
  // testSort("count", sort.countingsort);
  // testSort("radix", sort.radixsort);
  // testSort("heap", sort.heapsort);
}
