function fizzBuzz(n) {
  // Check if the input number is within constraint
  // If yes, then run the function
  if (n >= 1 && n <= 10**4) {
    // Create an array with the size of the number input
    let output = [];
    // Push values starting from 1 to the number input, where for each value being pushed if matches with the condition below will be pushed as the converted value instead of the number itself
    for (let i = 1; i <= n; i++) {
      if (i % 3 === 0 && i % 5 === 0) {
        console.log("number is divisible by 3 and 5");
        output.push("FizzBuzz");
      } else if(i % 3 === 0) {
        console.log("number is divisible by 3");
        output.push("Fizz");
      } else if(i % 5 === 0) {
        console.log("number is divisible by 5");
        output.push("Buzz");
      } else {
        console.log("number is not divisble by either 3 or 5");
        output.push(i.toString());
      }
    }
    console.log(output);
    return output
  } else {
    console.log("Number is not within constraint");
    return
  }
};

fizzBuzz(15);