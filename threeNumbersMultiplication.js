/* 
Given f(2)(3)(4), this should return the product of these numbers which is 24
*/

/* 
1. In the above example, the inner most function should return 4
2. The function above it/before it should return 3 x the inner most function returned value which is 4
3. The top most function should be 2 x the product of #2
*/

function f(number) {
  let product = number;
  console.log("Initial Product: ", product);
  return function anotherF (anotherNumber) {
    console.log("Number input", anotherNumber);
    product = product * anotherNumber;
    console.log("Current Product: ", product);
    return anotherF
  };
}

f(2)(3)(4);