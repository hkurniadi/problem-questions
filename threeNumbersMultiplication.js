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

// f(2)(3)(4)();

// let multiply = f(2);
// multiply(3)
// multiply(4)

// function counter() {
//   var count = 0;
//   return function() {
//       console.log(count++);
//   }
// }
// var count = counter();
// // console.log(typeof(count));
// count();
// count();
// count();

function curry(fn) {
  const args = []
  return function inner(arg) {
    if(args.length === fn.length) return fn(...args)
    args.push(arg)
    return inner
  }
}

function add(a, b) {
  return a + b
}

console.log(add.length);

// const curriedAdd = curry(add)
// console.log(curriedAdd(2)(3)()) // 5